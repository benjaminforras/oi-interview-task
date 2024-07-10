import { ExchangeRateBase } from './exchange-rate-base.interface';

export interface ExchangeRateHistoricalResponse extends ExchangeRateBase {
  year: number;
  month: number;
  day: number;
  base_code: string;

  conversion_rates?: Record<string, number>;
  requested_amount?: number;
  conversion_amounts?: Record<string, number>;
}
