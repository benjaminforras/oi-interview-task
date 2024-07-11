import { Component, inject } from '@angular/core';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-landing-hero-footer',
  standalone: true,
  imports: [HlmButtonModule],
  template: `
    <div
      class="mt-6 flex items-center gap-x-1.5 py-3 text-sm text-gray-800 after:ms-6 after:flex-1 after:border-t after:border-gray-200 md:mt-12 dark:text-white dark:after:border-neutral-700">
      Compare
      <span
        class="bg-gradient-to-l from-blue-600 to-violet-500 bg-clip-text font-semibold text-transparent dark:from-blue-400 dark:to-violet-400">
        {{ supportedCurrencies().supported_codes.length }}
      </span>
      currencies powered by
      <a class="m-0 h-auto p-0" variant="link" hlmBtn href="https://www.exchangerate-api.com/" target="_blank">
        Exchange Rates API
      </a>
    </div>
  `,
  styles: ``,
})
export class LandingHeroFooterComponent {
  private readonly _appService = inject(AppService);
  readonly supportedCurrencies = this._appService.supportedCurrencies;
}
