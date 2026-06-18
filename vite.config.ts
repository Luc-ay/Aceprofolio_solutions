import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Custom local API dev middleware plugin
function apiDevPlugin() {
  return {
    name: 'api-dev-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/api/send-email') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk.toString();
          });
          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json');
            try {
              const { type, formData } = JSON.parse(body);

              if (!type || !formData) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing type or form data' }));
                return;
              }

              const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
              const smtpPort = parseInt(process.env.SMTP_PORT || '465');
              const smtpUser = process.env.SMTP_USER;
              const smtpPass = process.env.SMTP_PASS;
              const smtpReceiver = process.env.SMTP_RECEIVER || smtpUser;

              if (!smtpUser || !smtpPass) {
                console.warn('SMTP configuration missing in dev environment. Simulating success.');
                res.statusCode = 200;
                res.end(JSON.stringify({
                  success: true,
                  message: 'SMTP credentials not configured. Email simulated successfully.',
                  simulated: true,
                  data: formData
                }));
                return;
              }

              const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
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
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eef2f6; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
                    <h2 style="color: #007aff; border-bottom: 2px solid #eef2f6; padding-bottom: 12px; margin-top: 0;">Mentorship Application Received</h2>
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
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eef2f6; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
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

              await transporter.sendMail({
                from: `"${type === 'mentor' ? 'Mentorship' : 'Hiring Desk'}" <${smtpUser}>`,
                to: smtpReceiver,
                subject: subject,
                html: emailHtml,
              });

              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: 'Form submitted and email dispatched successfully!' }));
            } catch (err: any) {
              console.error('Local mailer error:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message || 'Internal local mailer error' }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
