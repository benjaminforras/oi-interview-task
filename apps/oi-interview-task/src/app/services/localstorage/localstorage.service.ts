import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { LocalStorageKey } from '../../enums/localstorage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly _window = inject(DOCUMENT).defaultView;

  setItem(key: LocalStorageKey, value: string): void {
    this._window?.localStorage?.setItem(key, value);
  }

  getItem(key: LocalStorageKey, defaultValue?: string): string | null | undefined {
    return this._window?.localStorage?.getItem(key) ?? defaultValue;
  }
}
