import baseEmailTemplate from './base';

type Props = {
  recipientName: string;
  leadName: string;
  leadEmail: string;
  leadPhone?: string;
  leadCompany?: string;
  leadSource?: string;
  leadValue?: string;
  addedBy: string;
  dashboardLink: string;
};

export const newLeadAddedTemplate = (data: Props) => {
  const {
    recipientName,
    leadName,
    leadEmail,
    leadPhone,
    leadCompany,
    leadSource,
    leadValue,
    addedBy,
    dashboardLink,
  } = data;

  const bodyContent = `
        <tr>
            <td class="content">
                <h1>New Lead Added 📈</h1>
                <p class="greeting">Hi ${recipientName},</p>
                <p>Great news! A new lead has been added to your CRM pipeline. Here are the details:</p>
                
                <div class="info-box">
                    <p><strong>Lead Name:</strong> ${leadName}</p>
                    <p><strong>Email:</strong> ${leadEmail}</p>
                    ${leadPhone ? `<p><strong>Phone:</strong> ${leadPhone}</p>` : ''}
                    ${leadCompany ? `<p><strong>Company:</strong> ${leadCompany}</p>` : ''}
                    ${leadSource ? `<p><strong>Source:</strong> ${leadSource}</p>` : ''}
                    ${leadValue ? `<p><strong>Estimated Value:</strong> ${leadValue}</p>` : ''}
                    <p><strong>Added By:</strong> ${addedBy}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                
                <p>This lead is now visible in your dashboard and ready for follow-up action.</p>
                
                <div class="button-container">
                    <a href="${dashboardLink}" class="button">View Lead Details</a>
                </div>
                
                <p style="margin-top: 30px; font-size: 14px; color: #666666;"><em>Tip: Research shows that responding to leads within the first hour increases conversion rates by up to 7x!</em></p>
                
                <p style="margin-top: 30px;">Best regards,<br><strong>The Excite Enterprise Team</strong></p>
            </td>
        </tr>
    `;

  return baseEmailTemplate(
    bodyContent,
    `New lead: ${leadName} has been added to your CRM`
  );
};
