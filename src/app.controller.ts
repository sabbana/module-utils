import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SmsService } from './sms/sms.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly smsService: SmsService,
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
      subject: data.subject,
      template: data.template,
      html: data.html,
      context: data.context,
    };
    return this.appService.sendMail(options);
  }

  @Post('send-sms')
  sendSmsOtp(
    @Body('phoneNumber') phoneNumber: string,
    @Body('message') message: string,
  ) {
    return this.smsService.sendSMS(phoneNumber, message);
  }
}
