import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private logger = new Logger(EmailService.name);
  private from: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('sendgrid.apiKey');
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY is not set in environment variables');
    }
    sgMail.setApiKey(apiKey);

    const from = this.configService.get<string>('sendgrid.from');
    if (!from) {
      throw new Error('SENDGRID_FROM is not set in environment variables');
    }
    this.from = from;
  }

  async sendPatientConfirmation(to: string, fullName: string) {
    try {
      const msg = {
        to,
        from: this.from,
        subject: 'Patient Registration Successful',
        text: `Hello ${fullName}, your registration was successful!`,
        html: `<p>Hello <b>${fullName}</b>, your registration was successful!</p>`,
      };
      await sgMail.send(msg);
      this.logger.log(`Confirmation email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
    }
  }
}
