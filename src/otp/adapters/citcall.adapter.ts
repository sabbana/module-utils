import axios from 'axios';

export class CitcallAdapter {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = `https://api.citcall.com/v2/smsotp`;
  }

  async sendSMS(phoneNumber: string, message: string) {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    };

    const data = `msisdn=${phoneNumber}&content=${message}`;

    try {
      const response = await axios.post(this.baseUrl, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
