import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { LocalStorageKey } from './enums/localstorage-key.enum';
import { ExchangeRateEnrichedResponse } from './interfaces/exchange-rate-enriched-response.interface';
import { ExchangeRatePairConversionResponse } from './interfaces/exchange-rate-pair-conversion-response.interface';
import { ExchangeRateSupportedCodesResponse } from './interfaces/exchange-rate-supported-codes-response.interface';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';
import { LocalStorageService } from './services/localstorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly _exchangeRateService = inject(ExchangeRateService);
  private readonly _localStorageService = inject(LocalStorageService);

  supportedCurrencies = toSignal(this._exchangeRateService.getCurrencyCodes(), {
    initialValue: {
      result: '',
      documentation: '',
      terms_of_use: '',
      supported_codes: [],
    } as ExchangeRateSupportedCodesResponse,
  });

  getSelectedCurrencies(): [string, string] {
    return [
      this._localStorageService.getItem(LocalStorageKey.SELECTED_BASE_CURRENCY, '')!,
      this._localStorageService.getItem(LocalStorageKey.SELECTED_TARGET_CURRENCY, '')!,
    ];
  }

  saveSelectedCurrencies(baseCurrency: string, targetCurrency: string): void {
    this._localStorageService.setItem(LocalStorageKey.SELECTED_BASE_CURRENCY, baseCurrency);
    this._localStorageService.setItem(LocalStorageKey.SELECTED_TARGET_CURRENCY, targetCurrency);
  }

  getExchangeRate(from: string, to: string, amount?: number): Observable<ExchangeRatePairConversionResponse> {
    return this._exchangeRateService.pairRates(from, to, amount);
  }

  getExchangeRateEnriched(from: string, to: string): Observable<ExchangeRateEnrichedResponse> {
    return this._exchangeRateService.enrichedPairRates(from, to);
  }
}
