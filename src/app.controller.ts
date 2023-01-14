import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
    return this.appService.sendSms(phoneNumber, message);
  }
}
