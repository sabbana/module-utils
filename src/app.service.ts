import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { SmsService } from './sms/sms.service';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: EmailService,
    private readonly smsService: SmsService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  sendMail(options: any): Promise<any> {
    return this.mailService.send(options);
  }

  sendSms(phoneNumber: string, message: string) {
    return this.smsService.sendSMS(phoneNumber, message);
  }
}
