import { ExchangeRateBase } from './exchange-rate-base.interface';

export interface ExchangeRateError extends ExchangeRateBase {
  result: 'error';
  'error-type':
    | 'unknown-code'
    | 'unsupported-code'
    | 'malformed-request'
    | 'invalid-key'
    | 'inactive-account'
    | 'quota-reached';
}
