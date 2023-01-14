import { CitcallAdapter } from './citcall.adapter';
import { TwilioAdapter } from './twilio.adapter';
import { Provider } from '../enum/provider.enum';

export const createSMSAdapter = (
  provider: string,
  apiKey: string,
  apiSecret: string,
  from: string,
) => {
  switch (provider) {
    case Provider.CITCALL:
      return new CitcallAdapter(apiKey);
    case Provider.TWILIO:
      return new TwilioAdapter(apiKey, apiSecret, from);
    default:
      throw new Error('Invalid SMS provider');
  }
};
