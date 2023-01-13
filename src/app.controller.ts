import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SmsService } from './sms/sms.service';
import axios from 'axios';

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
      context: data.context,
    };
    return this.appService.sendMail(options);
  }

  @Get('send-sms')
  sendSmsOtp() {
    // generate otpCode
    const otpCode = Math.floor(Math.random() * 900000) + 100000;
    const message = `Your OTP Code is : ${otpCode}`;
    console.log(message);
    const phoneNumber = '+628562905595';
    // store otpCode mechanism = redis/db
    return this.smsService.sendSMS(phoneNumber, message);
  }

  @Post('register-phone')
  async register(@Body() param: any): Promise<any> {
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.OTP_APIKEY}/OutgoingCallerIds.json`,
      new URLSearchParams({
        FriendlyName: 'My Home Phone Number',
        PhoneNumber: param.phoneNumber,
      }),
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env.OTP_APIKEY + ':' + process.env.OTP_APIKEY,
            ).toString('base64'),
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    return response;
  }
}
