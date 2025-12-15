import baseEmailTemplate from './base';

type Props = {
  fullname: string;
  resetLink: string;
  baseUrl: string;
  expiryTime?: string;
};

export const forgotPasswordTemplate = (data: Props) => {
  const { fullname, resetLink, baseUrl, expiryTime = '1 hour' } = data;

  const bodyContent = `
        <tr>
            <td class="content">
                <h1>Reset Your Password 🔐</h1>
                <p class="greeting">Hi ${fullname},</p>
                <p>We received a request to reset the password for your Excite Enterprise CRM account. Click the button below to create a new password:</p>
                
                <div class="button-container">
                    <a href="${resetLink}" class="button">Reset Password</a>
                </div>
                
                <p style="font-size: 14px; color: #666666;">If the button doesn't work, copy and paste this link into your browser:</p>
                <a href="${resetLink}" class="link-fallback">${resetLink}</a>
                
                <div class="info-box">
                    <p><strong>Important:</strong> This password reset link will expire in ${expiryTime}. If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
                </div>
                
                <p style="margin-top: 30px;">For your security, we recommend choosing a strong password that you haven't used before.</p>
                <p style="margin-top: 30px;">Best regards,<br><strong>The Excite Enterprise Team</strong></p>
                
                <div class="help-section">
                    <p>Need Help?</p>
                    <a href="${baseUrl}/support">Contact our support team</a>
                </div>
            </td>
        </tr>
    `;

  return baseEmailTemplate(
    bodyContent,
    'Reset your Excite Enterprise password'
  );
};
