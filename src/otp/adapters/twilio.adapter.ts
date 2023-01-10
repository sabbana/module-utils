import axios from 'axios';

export class TwilioAdapter {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string;

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.baseUrl = `https://api.twilio.com/2010-04-01/Accounts/${this.apiKey}/Messages.json`;
  }

  async sendSMS(phoneNumber: string, message: string) {
    const config = {
      auth: {
        username: this.apiKey,
        password: this.apiSecret,
      },
    };

    const data = new URLSearchParams({
      'To': phoneNumber,
      'Body': message,
    });

    try {
      const response = await axios.post(this.baseUrl, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
