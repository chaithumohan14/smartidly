import { Injectable, Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private logger = new Logger(EmailService.name);

  async sendEmail(to: string, subject: string, body: string) {
    this.logger.log(
      `Sending email to ${to} with subject ${subject} and body ${body}`,
    );
    const transporter = createTransport({
      service: 'gmail',
      secure: false,
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: '"Smartidly" <no-reply@smartidly.com>',
        to,
        subject,
        html: body,
      });
      this.logger.log(`Email sent: ${info.response}`);
    } catch (error) {
      this.logger.error(`Error sending email ${error}`);
    }
  }
}
