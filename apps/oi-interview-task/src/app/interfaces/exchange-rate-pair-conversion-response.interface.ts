import { ExchangeRateBase } from './exchange-rate-base.interface';

export interface ExchangeRatePairConversionResponse extends ExchangeRateBase {
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;

  base_code: string;
  target_code: string;
  conversion_rate: number;
  conversion_result?: number;
}
