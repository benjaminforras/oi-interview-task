import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRateEnrichedResponse } from '../../interfaces/exchange-rate-enriched-response.interface';
import { ExchangeRateHistoricalResponse } from '../../interfaces/exchange-rate-historical-response.interface';
import { ExchangeRatePairConversionResponse } from '../../interfaces/exchange-rate-pair-conversion-response.interface';
import { ExchangeRateResponse } from '../../interfaces/exchange-rate-response.interface';
import { ExchangeRateSupportedCodesResponse } from '../../interfaces/exchange-rate-supported-codes-response.interface';
import { EXCHANGE_RATE_API_URL } from '../../tokens/exchange-rate-api-url.token';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private readonly _apiUrl = inject(EXCHANGE_RATE_API_URL);
  private readonly _httpClient = inject(HttpClient);

  getRates(baseCurrency: string): Observable<ExchangeRateResponse> {
    return this._httpClient.get<ExchangeRateResponse>(`${this._apiUrl}/latest/${baseCurrency}`);
  }

  pairRates(
    baseCurrency: string,
    targetCurrency: string,
    amount?: number,
  ): Observable<ExchangeRatePairConversionResponse> {
    return this._httpClient.get<ExchangeRatePairConversionResponse>(
      `${this._apiUrl}/pair/${baseCurrency}/${targetCurrency}${amount ? '/' + amount : ''}`,
    );
  }

  enrichedPairRates(baseCurrency: string, targetCurrency: string): Observable<ExchangeRateEnrichedResponse> {
    return this._httpClient.get<ExchangeRateEnrichedResponse>(
      `${this._apiUrl}/enriched/${baseCurrency}/${targetCurrency}`,
    );
  }

  getHistoricalRates(baseCurrency: string, date: Date): Observable<ExchangeRateHistoricalResponse> {
    return this._httpClient.get<ExchangeRateHistoricalResponse>(
      `${this._apiUrl}/history/${baseCurrency}}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`,
    );
  }

  getCurrencyCodes(): Observable<ExchangeRateSupportedCodesResponse> {
    return this._httpClient.get<ExchangeRateSupportedCodesResponse>(`${this._apiUrl}/codes`);
  }
}
