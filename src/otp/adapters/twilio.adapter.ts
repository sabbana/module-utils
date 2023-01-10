import axios from 'axios';

export class TwilioAdapter {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string;

  constructor(apiKey: string, apiSecret: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.baseUrl = baseUrl;
  }

  async sendSMS(phoneNumber: string, message: string) {
    const config = {
      auth: {
        username: this.apiKey,
        password: this.apiSecret,
      },
    };

    const data = {
      to: phoneNumber,
      body: message,
    };

    try {
      const response = await axios.post(this.baseUrl, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
