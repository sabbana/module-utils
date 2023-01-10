import { Injectable } from '@nestjs/common';
import { createSMSAdapter } from './adapters/factory.adapter';

@Injectable()
export class OtpService {
  private adapter: any;

  constructor(provider: string, apiKey: string, apiSecret: string, baseUrl: string) {
    this.adapter = createSMSAdapter(provider, apiKey, apiSecret, baseUrl);
  }

  async sendSMS(phoneNumber: string, message: string) {
    return this.adapter.sendSMS(phoneNumber, message);
  }
}
