const baseEmailTemplate = (bodyContent, preheaderText = '') => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Excite Enterprise</title>
    <!--[if gte mso 9]>
    <style>sup { font-size: 100% !important; }</style>
    <![endif]-->
    <style>
        /* Reset Styles */
        body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        td { padding: 0; margin: 0; }
        
        /* Base Styles */
        body, table, td, p, a, li { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            -webkit-text-size-adjust: none; 
            -ms-text-size-adjust: none; 
        }
        
        .wrapper { width: 100%; background-color: #f4f4f4; }
        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        
        /* Header Styles */
        .header { background-color: #000000; padding: 20px; text-align: center; }
        .logo { height: 60px; width: auto; }
        
        /* Content Styles */
        .content { padding: 40px 30px; }
        .content h1 { color: #000000; font-size: 28px; font-weight: 600; margin: 0 0 20px 0; line-height: 1.3; }
        .content p { color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0; }
        .content .greeting { color: #000000; font-weight: 500; }
        
        /* Button Styles */
        .button-container { text-align: center; margin: 30px 0; }
        .button { 
            display: inline-block;
            padding: 15px 40px;
            background-color: #6fd20d;
            color: #000000 !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .button:hover { background-color: #5ab90b; }
        
        /* Info Box Styles */
        .info-box { 
            background-color: #f9f9f9; 
            border-left: 4px solid #6fd20d; 
            padding: 20px; 
            margin: 25px 0; 
            border-radius: 4px;
        }
        .info-box p { margin: 0; font-size: 14px; color: #555555; }
        .info-box strong { color: #000000; }
        
        /* Link Styles */
        .link-fallback { 
            color: #6fd20d; 
            word-break: break-all; 
            font-size: 14px; 
            margin: 20px 0;
            display: block;
        }
        
        /* Help Section */
        .help-section { 
            background-color: #f5f2f6; 
            padding: 20px; 
            text-align: center; 
            margin-top: 30px;
            border-radius: 8px;
        }
        .help-section p { font-weight: 600; color: #000000; margin: 0 0 10px 0; }
        .help-section a { color: #000000; text-decoration: underline; }
        
        /* Footer Styles */
        .footer { background-color: #6fd20d; padding: 40px 30px; }
        .footer p { color: #ffffff; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0; text-align: center; }
        .footer .company-info { margin-top: 20px; }
        .footer a { color: #ffffff; text-decoration: underline; }
        
        /* Social Links */
        .social-links { text-align: center; margin-top: 20px; }
        .social-links a { 
            display: inline-block; 
            margin: 0 8px; 
            color: #ffffff;
            text-decoration: none;
            font-size: 14px;
        }
        
        /* Responsive Styles */
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .content { padding: 30px 20px !important; }
            .content h1 { font-size: 24px !important; }
            .content p { font-size: 15px !important; }
            .button { display: block !important; padding: 15px 20px !important; }
            .footer { padding: 30px 20px !important; }
            .logo { height: 50px !important; }
        }
        
        @media only screen and (max-width: 480px) {
            .content h1 { font-size: 22px !important; }
            .content p { font-size: 14px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0;">
    ${preheaderText ? `<div style="display: none; max-height: 0; overflow: hidden;">${preheaderText}</div>` : ''}
    
    <div class="wrapper">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td align="center">
                    <table class="email-container" width="600" cellpadding="0" cellspacing="0" border="0">
                        <!-- Header -->
                        <tr>
                            <td class="header">
                                <img src="https://liiueu.stripocdn.email/content/guids/824d24ad-c799-4852-9a7b-0f149e1a4cbb/images/28481619431982683.png" alt="Excite Enterprise" class="logo">
                            </td>
                        </tr>
                        
                        <!-- Body Content -->
                        // ${bodyContent}
                        
                        <!-- Footer -->
                        <tr>
                            <td class="footer">
                                <p>You received this email because of your account activity on the Excite Enterprise CRM platform.</p>
                                <div class="company-info">
                                    <p style="margin: 5px 0;">© Excite Inc.</p>
                                    <p style="margin: 5px 0;">3, Dapo Bode Street, Yaba Phase 2, Lagos, Nigeria</p>
                                    <p style="margin: 5px 0;">Company Number: 07012345</p>
                                    <p style="margin: 5px 0;">Email: enquiry@exciteafrica.com</p>
                                </div>
                                <div style="margin-top: 20px;">
                                    <a href="https://www.exciteenterprise.com/privacy" style="color: #ffffff;">Privacy Policy</a>
                                </div>
                                <div class="social-links">
                                    <a href="#">LinkedIn</a> | 
                                    <a href="#">Twitter</a> | 
                                    <a href="#">Facebook</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
`;

export default baseEmailTemplate;