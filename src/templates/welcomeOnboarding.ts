import baseEmailTemplate from './base';

type Props = {
  fullname: string;
  dashboardLink: string;
  tutorialLink: string;
  supportLink: string;
};

export const welcomeOnboardingTemplate = (data: Props) => {
  const { fullname, dashboardLink, tutorialLink, supportLink } = data;

  const bodyContent = `
        <tr>
            <td class="content">
                <h1>Welcome Aboard!</h1>
                <p class="greeting">Hi ${fullname},</p>
                <p>Congratulations! Your email has been verified and your Excite Enterprise CRM account is now fully active. We're excited to help you transform your sales process.</p>
                
                <p style="font-size: 18px; font-weight: 600; margin-top: 30px; margin-bottom: 15px;">Here's how to get started:</p>
                
                <div style="margin: 20px 0;">
                    <div style="display: flex; margin-bottom: 20px;">
                        <div style="background-color: #6fd20d; color: #000; font-weight: 600; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">1</div>
                        <div>
                            <p style="margin: 0; font-weight: 600;">Set up your profile</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Add your details and customize your workspace</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; margin-bottom: 20px;">
                        <div style="background-color: #6fd20d; color: #000; font-weight: 600; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">2</div>
                        <div>
                            <p style="margin: 0; font-weight: 600;">Import your leads</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Bring in existing contacts or start fresh</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; margin-bottom: 20px;">
                        <div style="background-color: #6fd20d; color: #000; font-weight: 600; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">3</div>
                        <div>
                            <p style="margin: 0; font-weight: 600;">Explore features</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Discover powerful tools to boost your sales</p>
                        </div>
                    </div>
                </div>
                
                <div class="button-container">
                    <a href="${dashboardLink}" class="button">Go to Dashboard</a>
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <a href="${tutorialLink}" style="color: #6fd20d; text-decoration: underline; font-size: 14px;">Watch Quick Start Tutorial</a>
                </div>
                
                <p style="margin-top: 30px;">Best regards,<br><strong>The Excite Enterprise Team</strong></p>
                
                <div class="help-section">
                    <p>Questions? We're Here to Help!</p>
                    <a href="${supportLink}">Contact Support</a>
                </div>
            </td>
        </tr>
    `;

  return baseEmailTemplate(
    bodyContent,
    'Your account is ready! Start managing leads today'
  );
};
