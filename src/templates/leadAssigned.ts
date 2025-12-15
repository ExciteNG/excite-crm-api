import baseEmailTemplate from './base';

type Props = {
  managerName: string;
  leadName: string;
  leadEmail: string;
  leadPhone?: string;
  leadCompany?: string;
  leadStatus?: string;
  priority?: 'High' | 'Medium' | 'Low';
  assignedBy: string;
  notes?: string;
  dashboardLink: string;
};

export const leadAssignedTemplate = (data: Props) => {
  const {
    managerName,
    leadName,
    leadEmail,
    leadPhone,
    leadCompany,
    leadStatus,
    priority,
    assignedBy,
    notes,
    dashboardLink,
  } = data;

  const bodyContent = `
        <tr>
            <td class="content">
                <h1>Lead Assigned to You 🎯</h1>
                <p class="greeting">Hi ${managerName},</p>
                <p>A new lead has been assigned to you for follow-up. Please review the details below and take appropriate action:</p>
                
                <div class="info-box">
                    <p><strong>Lead Name:</strong> ${leadName}</p>
                    <p><strong>Email:</strong> ${leadEmail}</p>
                    ${leadPhone ? `<p><strong>Phone:</strong> ${leadPhone}</p>` : ''}
                    ${leadCompany ? `<p><strong>Company:</strong> ${leadCompany}</p>` : ''}
                    ${leadStatus ? `<p><strong>Status:</strong> ${leadStatus}</p>` : ''}
                    ${priority ? `<p><strong>Priority:</strong> <span style="color: ${priority === 'High' ? '#dc3545' : priority === 'Medium' ? '#ffc107' : '#28a745'};">${priority}</span></p>` : ''}
                    <p><strong>Assigned By:</strong> ${assignedBy}</p>
                    <p><strong>Date Assigned:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                
                ${
                  notes
                    ? `
                <div style="background-color: #fff9e6; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0; border-radius: 4px;">
                    <p style="margin: 0; font-size: 14px; color: #555555;"><strong>Notes from ${assignedBy}:</strong></p>
                    <p style="margin: 10px 0 0 0; font-size: 14px; color: #555555;">${notes}</p>
                </div>
                `
                    : ''
                }
                
                <div class="button-container">
                    <a href="${dashboardLink}" class="button">View & Manage Lead</a>
                </div>
                
                <p style="margin-top: 30px;">This lead is now in your pipeline. Update the status as you progress through the sales cycle.</p>
                <p style="margin-top: 30px;">Best regards,<br><strong>The Excite Enterprise Team</strong></p>
            </td>
        </tr>
    `;

  return baseEmailTemplate(
    bodyContent,
    `New lead assigned: ${leadName} - ${priority || 'Standard'} priority`
  );
};
