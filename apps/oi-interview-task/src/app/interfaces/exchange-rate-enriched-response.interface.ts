import { ExchangeRateBase } from './exchange-rate-base.interface';

export interface ExchangeRateEnrichedResponse extends ExchangeRateBase {
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;

  base_code: string;
  target_code: string;
  conversion_rate: number;

  target_data: {
    locale: string;
    two_letter_code: string;
    currency_name: string;
    currency_name_short: string;
    display_symbol: string;
    flag_url: string;
  };
}
