import { Injectable } from '@nestjs/common';
import { createSMSAdapter } from './adapters/factory.adapter';

@Injectable()
export class SmsService {
  private adapter: any;
  private provider: string = process.env.OTP_PROVIDER;
  private apiKey: string = process.env.OTP_APIKEY;
  private apiSecret: string = process.env.OTP_APISECRET;
  private from: string = process.env.OTP_FROM;

  constructor() {
    this.provider = this.provider;
    this.adapter = createSMSAdapter(
      this.provider,
      this.apiKey,
      this.apiSecret,
      this.from,
    );
  }

  async sendSMS(phoneNumber: string, message: string) {
    return this.adapter.sendSMS(phoneNumber, message);
  }
}
