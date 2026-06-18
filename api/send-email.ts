import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle Options preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, formData } = req.body;

    if (!type || !formData) {
      return res.status(400).json({ error: 'Missing type or form data' });
    }

    // Read SMTP settings from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpReceiver = process.env.SMTP_RECEIVER || smtpUser;

    if (!smtpUser || !smtpPass) {
      console.warn('SMTP configuration missing. Email will be simulated.');
      return res.status(200).json({
        success: true,
        message: 'SMTP credentials not configured on server. Email was successfully simulated in development.',
        simulated: true,
        data: formData
      });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // Use SSL/TLS for port 465
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    let subject = '';
    let emailHtml = '';

    if (type === 'mentor') {
      subject = `[Aceprofolio Solutions] New Mentor Request: ${formData.name}`;
      emailHtml = `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eef2f6; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
          <h2 style="color: #007aff; border-bottom: 2px solid #eef2f6; padding-bottom: 12px; margin-top: 0;">Mentorship Application Recieved</h2>
          <p style="font-size: 14px; line-height: 1.5; color: #4a5568;">A new student has requested connection with a mentor at Aceprofolio Solutions.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; font-size: 14px; border-bottom: 1px solid #edf2f7; width: 35%;">Name</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #edf2f7;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; font-size: 14px; border-bottom: 1px solid #edf2f7;">Email</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${formData.email}" style="color: #007aff; text-decoration: none;">${formData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; font-size: 14px; border-bottom: 1px solid #edf2f7;">Socials / Links</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #edf2f7;">${formData.socials || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; font-size: 14px; border-bottom: 1px solid #edf2f7;">Current Skills</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #edf2f7;">${formData.skills}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; font-size: 14px; border-bottom: 1px solid #edf2f7;">What to Learn</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #edf2f7;">${formData.objectives}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; font-size: 14px; border-bottom: 1px solid #edf2f7;">Role Models</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #edf2f7;">${formData.roleModels || 'N/A'}</td>
            </tr>
          </table>

          <div style="background-color: #f7fafc; border-radius: 8px; padding: 16px; margin-top: 24px; text-align: center; border: 1px solid #edf2f7;">
            <p style="margin: 0; font-size: 12px; color: #718096; font-style: italic;">
              "our top 20 corresponding picks to your form answers will be sent to your mail to choose from with contact details"
            </p>
          </div>
        </div>
      `;
    } else {
      subject = `[Aceprofolio Solutions] Hiring Inquiry: ${formData.companyName}`;
      emailHtml = `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eef2f6; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
          <h2 style="color: #3c88ff; border-bottom: 2px solid #eef2f6; padding-bottom: 12px; margin-top: 0;">Business Hiring Inquiry</h2>
          <p style="font-size: 14px; line-height: 1.5; color: #4a5568;">A client or business is looking to hire professionals through Aceprofolio Solutions.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; font-size: 14px; border-bottom: 1px solid #edf2f7; width: 35%;">Client / Company</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #edf2f7;">${formData.companyName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; font-size: 14px; border-bottom: 1px solid #edf2f7;">Email</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${formData.email}" style="color: #3c88ff; text-decoration: none;">${formData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; font-size: 14px; border-bottom: 1px solid #edf2f7;">Service Required</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #edf2f7;">${formData.details}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; font-size: 14px; border-bottom: 1px solid #edf2f7;">Budget Bounds</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #edf2f7;"><strong>$${formData.budget} USD</strong></td>
            </tr>
          </table>

          <div style="background-color: #f7fafc; border-radius: 8px; padding: 16px; margin-top: 24px; text-align: center; border: 1px solid #edf2f7;">
            <p style="margin: 0; font-size: 12px; color: #718096; font-style: italic;">
              "our top 20 corresponding picks to your form answers will be sent to your mail to choose from with contact details"
            </p>
          </div>
        </div>
      `;
    }

    // Send email
    await transporter.sendMail({
      from: `"${type === 'mentor' ? 'Mentorship Hub' : 'Hiring Desk'}" <${smtpUser}>`,
      to: smtpReceiver,
      subject: subject,
      html: emailHtml,
    });

    return res.status(200).json({ success: true, message: 'Form submitted and email dispatched successfully!' });
  } catch (error: any) {
    console.error('Error handling email request:', error);
    return res.status(500).json({ error: error.message || 'Internal server error occurred.' });
  }
}
