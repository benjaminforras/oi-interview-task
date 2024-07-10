import { ExchangeRateBase } from './exchange-rate-base.interface';

export interface ExchangeRateResponse extends ExchangeRateBase {
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;

  base_code: string;
  conversion_rates: Record<string, number>;
}
