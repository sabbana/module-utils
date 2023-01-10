import { CitcallAdapter } from './citcall.adapter';
import { TwilioAdapter } from './twilio.adapter';

export const createSMSAdapter = (provider: string, apiKey: string, apiSecret: string) => {
  switch (provider) {
    case 'citcall':
      return new CitcallAdapter(apiKey);
    case 'twilio':
      return new TwilioAdapter(apiKey, apiSecret);
    default:
      throw new Error('Invalid SMS provider');
  }
};
