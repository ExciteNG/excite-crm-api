import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY, CLIENT_URL } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';

import { isEmpty } from '@utils/util';
import {
  loginDto,
  resendVerificationDto,
  signupDto,
  updatePasswordDto,
} from '@/validator/auth.validator';
import EmailService from '@/services/email.service';
import Managers, { IManager } from '@/models/manager.model';
import {
  emailVerificationTemplate,
  welcomeOnboardingTemplate,
} from '@/templates';

class AuthService {
  public managers = Managers;
  public emailService = new EmailService();

  public async signup(userData: signupDto['body']) {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: IManager = await this.managers.findOne({
      email: userData.email,
    });

    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );

    const hashedPassword = await hash(userData.password, 10);

    const user = await this.managers.create({
      ...userData,
      name: {
        firstname: userData.firstname,
        lastname: userData.lastname,
      },
      password: hashedPassword,
    });

    user.confirmationCode = this.createToken(user).token;
    await user.save();

    // this.emailService
    //   .sendEmail({
    //     to: user.email,
    //     subject: 'Verify email address',
    //     // body: `Click on confirmation link: ${CLIENT_URL}/auth/verify-email/verify/${user.confirmationCode}`,
    //     body: emailVerificationTemplate({
    //       fullname: user.name.fullname,
    //       email: user.email,
    //       verificationLink: `${CLIENT_URL}/auth/verify-email/verify/${user.confirmationCode}`,
    //       baseUrl: CLIENT_URL,
    //     }),
    //   })
    this.emailService
      .sendUserEmail({
        to: user.email,
        subject: 'Verify email address',
        // body: `Click on confirmation link: ${CLIENT_URL}/auth/verify-email/verify/${user.confirmationCode}`,
        body: emailVerificationTemplate({
          fullname: user.name.fullname,
          email: user.email,
          verificationLink: `${CLIENT_URL}/auth/verify-email/verify/${user.confirmationCode}`,
          baseUrl: CLIENT_URL,
        }),
      })
      .then((res) => {
        console.log('Send confirmation: ', res);
        return { ...user, password: undefined, confirmationCode: undefined };
      })
      .catch((err) => {
        throw new HttpException(400, 'Error sending confirmation mail');
      });
  }

  public async verifyUser(confirmationCode: string): Promise<IManager> {
    if (isEmpty(confirmationCode))
      throw new HttpException(400, 'confirmation code is empty');

    const findUser: IManager = await this.managers.findOne({
      confirmationCode,
    });

    if (!findUser) throw new HttpException(401, 'Invalid token');

    findUser.isVerified = true;
    findUser.confirmationCode = undefined;
    const verifiedUser = await findUser.save();

    // this.emailService
    //   .sendEmail({
    //     to: findUser.email,
    //     subject: 'Welcome Aboard!',
    //     body: welcomeOnboardingTemplate({
    //       fullname: findUser.name.fullname,
    //       dashboardLink: `${CLIENT_URL}/dashboard`,
    //       tutorialLink: `${CLIENT_URL}/tutorials`,
    //       supportLink: `${CLIENT_URL}/support`,
    //     }),
    //   })
    this.emailService
      .sendUserEmail({
        to: findUser.email,
        subject: 'Welcome Aboard!',
        body: welcomeOnboardingTemplate({
          fullname: findUser.name.fullname,
          dashboardLink: `${CLIENT_URL}/dashboard`,
          tutorialLink: `${CLIENT_URL}/tutorials`,
          supportLink: `${CLIENT_URL}/support`,
        }),
      })
      .catch((err) => {
        throw new HttpException(400, 'Error resending verification mail');
      });

    return verifiedUser;
  }

  public async resendVerification(body: resendVerificationDto['body']) {
    if (isEmpty(body.email)) throw new HttpException(400, 'email is empty');

    const user = await this.managers.findOne({ email: body.email });
    if (!user) throw new HttpException(401, 'User does not exist');

    user.confirmationCode = this.createToken(user).token;
    await user.save();

    // this.emailService
    //   .sendEmail({
    //     to: user.email,
    //     subject: 'Verify email address',
    //     body: `Click on confirmation link: ${CLIENT_URL}/auth/verify-email/verify/${user.confirmationCode}`,
    //   })
    this.emailService
      .sendUserEmail({
        to: user.email,
        subject: 'Verify email address',
        body: `Click on confirmation link: ${CLIENT_URL}/auth/verify-email/verify/${user.confirmationCode}`,
      })
      .then((res) => {
        return { ...user, password: undefined, confirmationCode: undefined };
      })
      .catch((err) => {
        throw new HttpException(400, 'Error resending verification mail');
      });
  }

  public async login(
    userData: loginDto['body']
  ): Promise<{ cookie: string; user: IManager; token: string }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findManager: IManager = await this.managers.findOne({
      email: userData.email,
    });

    if (!findManager)
      throw new HttpException(401, `Email/Password is incorrect`);

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findManager.password
    );

    if (!isPasswordMatching)
      throw new HttpException(401, 'Email/Password is incorrect');

    if (!findManager.isVerified) {
      findManager.confirmationCode = this.createToken(findManager).token;
      const user = await findManager.save();

      // this.emailService
      //   .sendEmail({
      //     to: user.email,
      //     subject: 'Verify email address',
      //     body: emailVerificationTemplate({
      //       fullname: user.name.fullname,
      //       email: user.email,
      //       verificationLink: `${CLIENT_URL}/auth/verify-email/verify/${user.confirmationCode}`,
      //       baseUrl: CLIENT_URL,
      //     }),
      //   })
      this.emailService
        .sendUserEmail({
          to: user.email,
          subject: 'Verify email address',
          body: emailVerificationTemplate({
            fullname: user.name.fullname,
            email: user.email,
            verificationLink: `${CLIENT_URL}/auth/verify-email/verify/${user.confirmationCode}`,
            baseUrl: CLIENT_URL,
          }),
        })
        .catch((err) => {
          throw new HttpException(400, 'Error resending verification mail');
        });

      throw new HttpException(
        402,
        'Email is not verified, check mail for verification',
        { ...user.toObject(), password: undefined }
      );
    }

    const tokenData = this.createToken(findManager);
    const cookie = this.createCookie(tokenData);
    return { cookie, user: findManager, token: tokenData.token };
  }

  public async updatePassword(
    userData: IManager,
    body: updatePasswordDto['body']
  ) {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: IManager = await this.managers.findById(userData._id);
    if (!findUser) throw new HttpException(409, `This user does not exist`);

    const isOldPasswordMatching: boolean = await compare(
      body.oldPassword,
      findUser.password
    );
    if (!isOldPasswordMatching)
      throw new HttpException(401, 'Old password is incorrect');

    if (body.newPassword !== body.confirmNewPassword)
      throw new HttpException(
        400,
        'New password and confirm new password do not match'
      );

    const hashedNewPassword = await hash(body.newPassword, 10);
    findUser.password = hashedNewPassword;
    const updatedUser: IManager = await findUser.save();
    if (!updatedUser) throw new HttpException(400, 'Error updating password');

    return updatedUser;
  }

  public async logout(userData: IManager): Promise<IManager> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: IManager = await this.managers.findOne({
      email: userData.email,
      password: userData.password,
    });

    if (!findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} was not found`
      );

    return findUser;
  }

  public createToken(user: IManager): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 7 * 24 * 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
