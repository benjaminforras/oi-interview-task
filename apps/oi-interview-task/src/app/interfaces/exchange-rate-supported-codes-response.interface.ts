import { ExchangeRateBase } from './exchange-rate-base.interface';

export interface ExchangeRateSupportedCodesResponse extends ExchangeRateBase {
  supported_codes: [string, string][];
}
