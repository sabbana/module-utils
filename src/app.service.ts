import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { OtpModule } from './otp/otp.module';

@Injectable()
export class AppService {

  constructor(
    private readonly mailService: EmailService,
    // private readonly otpService: OtpModule
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  sendMail(options: any): Promise<any> {
    return this.mailService.send(options);
  }
}
