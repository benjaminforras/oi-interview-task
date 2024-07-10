import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { EXCHANGE_RATE_API_KEY } from '../tokens/exchange-rate-api-key.token';
import { EXCHANGE_RATE_API_URL } from '../tokens/exchange-rate-api-url.token';

export const exchangeRateApiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = inject(EXCHANGE_RATE_API_URL);

  if (!req.url.startsWith(apiUrl)) {
    return next(req);
  }

  const authToken = inject(EXCHANGE_RATE_API_KEY);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(authReq).pipe(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.error('Unauthorized request:', err);
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }
      return throwError(() => err);
    }),
  );
};
