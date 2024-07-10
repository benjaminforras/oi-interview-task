import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { exchangeRateApiInterceptor } from './interceptors/exchange-rate-api.interceptor';
import { EXCHANGE_RATE_API_KEY } from './tokens/exchange-rate-api-key.token';
import { EXCHANGE_RATE_API_URL } from './tokens/exchange-rate-api-url.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([exchangeRateApiInterceptor])),
    {
      provide: EXCHANGE_RATE_API_KEY,
      useValue: environment.EXCHANGE_RATE_API_KEY ?? '',
    },
    {
      provide: EXCHANGE_RATE_API_URL,
      useValue: environment.EXCHANGE_RATE_API_URL ?? '',
    },
  ],
};
