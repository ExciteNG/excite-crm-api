import baseEmailTemplate from './base';

type Props = {
  fullname: string;
  email: string;
  verificationLink: string;
  baseUrl: string;
};

export const emailVerificationTemplate = (data: Props) => {
  const { fullname, email, verificationLink, baseUrl } = data;

  const bodyContent = `
        <tr>
            <td class="content">
                <h1>Welcome to Excite Enterprise!</h1>
                <p class="greeting">Dear ${fullname},</p>
                <p>We're thrilled to have you join the Excite Enterprise CRM platform. To get started and unlock all the powerful features, please verify your email address.</p>
                
                <div class="button-container">
                    <a href="${verificationLink}" class="button">Verify Email Address</a>
                </div>
                
                <p style="font-size: 14px; color: #666666;">If the button doesn't work, copy and paste this link into your browser:</p>
                <a href="${verificationLink}" class="link-fallback">${verificationLink}</a>
                
                <div class="info-box">
                    <p><strong>Security Note:</strong> This verification link will expire in 24 hours. If you didn't create an account with Excite Enterprise, please ignore this email.</p>
                </div>
                
                <p>Once verified, you'll have full access to manage your leads, track opportunities, and drive your sales success.</p>
                <p style="margin-top: 30px;">Best regards,<br><strong>The Excite Enterprise Team</strong></p>
                
                <div class="help-section">
                    <p>Need Help?</p>
                    <a href="${baseUrl}/support">We're here, ready to talk</a>
                </div>
            </td>
        </tr>
    `;

  return baseEmailTemplate(
    bodyContent,
    'Verify your email to activate your Excite Enterprise account'
  );
};
