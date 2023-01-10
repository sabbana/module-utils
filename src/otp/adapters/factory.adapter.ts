import { CitcallAdapter } from './citcall.adapter';
import { TwilioAdapter } from './twilio.adapter';

export const createSMSAdapter = (provider: string, apiKey: string, apiSecret: string, baseUrl: string) => {
  switch (provider) {
    case 'citcall':
      return new CitcallAdapter(apiKey, baseUrl);
    case 'twilio':
      return new TwilioAdapter(apiKey, apiSecret, baseUrl);
    default:
      throw new Error('Invalid SMS provider');
  }
};
