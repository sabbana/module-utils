import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';
import { OtpService } from './otp/otp.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: EmailService,
    private readonly otpService: OtpService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('env-read')
  getEnvironmentVariable(): any {
    return {
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    };
  }

  @Post('send-mail')
  sendEmail(@Body() data: any): any {
    const options = {
      to: data.to,
      // cc: 'sabbana.log@gmail.com',
      // bcc: 'sabbana.a7@gmail.com',
      subject: data.subject,
      template: 'default',
      context: {
        name: data.name
      },
      attachments: [
        {
          filename: 'sample-attachment.jpg',
          path: '/home/sabbana/Pictures/xc50-230mmf45-67-ois-2_sample-images01.jpg' 
        }
      ]
    };
    return this.mailService.send(options);
  }
  
  @Get('send-sms')
  sendSmsOtp() {
    const message = 'Your OTP Code to access xxxvideo is : 666999';
    const phoneNumber = '+628562905595';
    return this.otpService.sendSMS(phoneNumber, message)
  }

}
