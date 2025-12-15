import baseEmailTemplate from './base';

type Props = {
  recipientName: string;
  leadName: string;
  oldStatus: string;
  newStatus: string;
  changedBy: string;
  comment?: string;
  dashboardLink: string;
};

export const leadStatusChangedTemplate = (data: Props) => {
  const {
    recipientName,
    leadName,
    oldStatus,
    newStatus,
    changedBy,
    comment,
    dashboardLink,
  } = data;

  const bodyContent = `
        <tr>
            <td class="content">
                <h1>Lead Status Updated 📊</h1>
                <p class="greeting">Hi ${recipientName},</p>
                <p>The status of one of your leads has been updated. Here are the details:</p>
                
                <div class="info-box">
                    <p><strong>Lead Name:</strong> ${leadName}</p>
                    <p><strong>Previous Status:</strong> ${oldStatus}</p>
                    <p><strong>New Status:</strong> <span style="color: #6fd20d; font-weight: 600;">${newStatus}</span></p>
                    <p><strong>Updated By:</strong> ${changedBy}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                
                ${
                  comment
                    ? `
                <div style="background-color: #e8f5e9; border-left: 4px solid #6fd20d; padding: 20px; margin: 25px 0; border-radius: 4px;">
                    <p style="margin: 0; font-size: 14px; color: #555555;"><strong>Update Notes:</strong></p>
                    <p style="margin: 10px 0 0 0; font-size: 14px; color: #555555;">${comment}</p>
                </div>
                `
                    : ''
                }
                
                <div class="button-container">
                    <a href="${dashboardLink}" class="button">View Lead Details</a>
                </div>
                
                <p style="margin-top: 30px;">Best regards,<br><strong>The Excite Enterprise Team</strong></p>
            </td>
        </tr>
    `;

  return baseEmailTemplate(
    bodyContent,
    `Lead status updated: ${leadName} is now ${newStatus}`
  );
};
