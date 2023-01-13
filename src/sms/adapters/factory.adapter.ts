import { CitcallAdapter } from './citcall.adapter';
import { TwilioAdapter } from './twilio.adapter';

export const createSMSAdapter = (
  provider: string,
  apiKey: string,
  apiSecret: string,
  from: string,
) => {
  switch (provider) {
    case 'citcall':
      return new CitcallAdapter(apiKey);
    case 'twilio':
      return new TwilioAdapter(apiKey, apiSecret, from);
    default:
      throw new Error('Invalid SMS provider');
  }
};
