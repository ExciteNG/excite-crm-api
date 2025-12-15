import baseEmailTemplate from './base';

type Props = {
  fullname: string;
  changeDate?: string;
  ipAddress?: string;
  supportLink: string;
};

export const passwordChangedTemplate = (data: Props) => {
  const { fullname, changeDate, ipAddress, supportLink } = data;

  const bodyContent = `
        <tr>
            <td class="content">
                <h1>Password Successfully Changed ✓</h1>
                <p class="greeting">Hi ${fullname},</p>
                <p>This email confirms that your Excite Enterprise CRM account password was successfully changed.</p>
                
                <div class="info-box">
                    <p><strong>Change Date:</strong> ${changeDate || new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    ${ipAddress ? `<p><strong>IP Address:</strong> ${ipAddress}</p>` : ''}
                </div>
                
                <p>If you made this change, no further action is needed. Your account is secure.</p>
                
                <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0; border-radius: 4px;">
                    <p style="margin: 0; font-size: 14px; color: #555555;"><strong>⚠️ Didn't change your password?</strong></p>
                    <p style="margin: 10px 0 0 0; font-size: 14px; color: #555555;">If you didn't make this change, please contact our support team immediately to secure your account.</p>
                </div>
                
                <div class="button-container">
                    <a href="${supportLink}" class="button" style="background-color: #dc3545;">Contact Support</a>
                </div>
                
                <p style="margin-top: 30px;">Best regards,<br><strong>The Excite Enterprise Team</strong></p>
            </td>
        </tr>
    `;

  return baseEmailTemplate(bodyContent, 'Your password has been changed');
};
