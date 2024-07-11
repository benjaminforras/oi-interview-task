import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideArrowRightLeft } from '@ng-icons/lucide';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmCardModule } from '@spartan-ng/ui-card-helm';
import { HlmIconModule } from '@spartan-ng/ui-icon-helm';
import { HlmInputModule } from '@spartan-ng/ui-input-helm';
import { HlmLabelModule } from '@spartan-ng/ui-label-helm';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { Observable, combineLatestWith, distinctUntilChanged, filter, map } from 'rxjs';
import { AppService } from '../../app.service';
import { ExchangeRateEnrichedResponse } from '../../interfaces/exchange-rate-enriched-response.interface';
import { ExchangeRatePairConversionResponse } from '../../interfaces/exchange-rate-pair-conversion-response.interface';

@Component({
  selector: 'app-landing-hero-form',
  standalone: true,
  providers: [
    provideIcons({
      lucideArrowRightLeft,
    }),
  ],
  imports: [
    AsyncPipe,
    ReactiveFormsModule,

    HlmCardModule,
    HlmButtonModule,
    HlmIconModule,

    HlmLabelModule,
    HlmInputModule,

    BrnSelectModule,
    HlmSelectModule,
    JsonPipe,
  ],
  template: `
    <form class="w-full" [formGroup]="formGroup" (ngSubmit)="onSubmit()">
      <div class="ms-auto w-full lg:mx-auto lg:me-0">
        <div class="flex flex-col pt-6" hlmCard hlmCardContent>
          <div
            class="space-y-6 lg:grid lg:grid-cols-[minmax(100px,_1fr)_minmax(100px,_1fr)_auto_minmax(100px,_1fr)] lg:items-end lg:gap-4 lg:space-y-0">
            <div>
              <label class="relative lg:text-lg" hlmLabel>
                Amount
                <input
                  class="h-auto w-full py-3 lg:py-4 lg:text-lg"
                  [formControl]="formGroup.controls.amount"
                  hlmInput
                  type="number"
                  placeholder="1.00" />
                @if (formGroup.controls.amount.errors?.['required'] && formGroup.controls.amount.touched) {
                  <span class="text-destructive absolute -bottom-6 left-0 text-sm">This is a required field</span>
                }
              </label>
            </div>
            <div class="relative">
              <label class="lg:text-lg" hlmLabel>
                From
                <brn-select class="my-1 inline-block w-full" [formControl]="formGroup.controls.from" placeholder="From">
                  <hlm-select-trigger class="h-auto w-full py-3 lg:py-4 lg:text-lg">
                    <hlm-select-value />
                  </hlm-select-trigger>
                  <hlm-select-content class="max-h-64">
                    @for (supportedCurrency of supportedCurrencies().supported_codes; track supportedCurrency) {
                      <hlm-option class="py-2 lg:px-2.5 lg:py-4" [value]="supportedCurrency[0]">
                        <span class="font-semibold">{{ supportedCurrency[0] }}</span>
                        <span class="text-muted-foreground">&nbsp;- {{ supportedCurrency[1] }}</span>
                      </hlm-option>
                    }
                  </hlm-select-content>
                </brn-select>
                @if (formGroup.controls.from.errors?.['required'] && formGroup.controls.from.touched) {
                  <span class="text-destructive absolute -bottom-5 left-0 text-sm">This is a required field</span>
                }
              </label>
            </div>
            <div class="pt-2 lg:pt-0">
              <button
                class="rounded-full p-5 lg:mb-2.5 lg:p-6"
                (click)="switchCurrencies()"
                type="button"
                hlmBtn
                variant="outline"
                size="icon">
                <hlm-icon class="h-4 w-4 flex-shrink-0" name="lucideArrowRightLeft" />
              </button>
            </div>
            <div class="relative">
              <label class="lg:text-lg" hlmLabel>
                To
                <brn-select class="my-1 inline-block w-full" [formControl]="formGroup.controls.to" placeholder="To">
                  <hlm-select-trigger class="h-auto w-full py-3 lg:py-4 lg:text-lg">
                    <hlm-select-value />
                  </hlm-select-trigger>
                  <hlm-select-content class="max-h-64">
                    @for (supportedCurrency of supportedCurrencies().supported_codes; track supportedCurrency) {
                      <hlm-option class="py-2 lg:px-2.5 lg:py-4" [value]="supportedCurrency[0]">
                        <span class="font-semibold">{{ supportedCurrency[0] }}</span>
                        <span class="text-muted-foreground">&nbsp;- {{ supportedCurrency[1] }}</span>
                      </hlm-option>
                    }
                  </hlm-select-content>
                </brn-select>
                @if (formGroup.controls.to.errors?.['required'] && formGroup.controls.to.touched) {
                  <span class="text-destructive absolute -bottom-5 left-0 text-sm">This is a required field</span>
                }
              </label>
            </div>
          </div>

          @if (exchangeRate$ | async; as exchangeRate) {
            <div class="mt-6">
              <div>
                <p class="m-0 max-w-full text-sm font-semibold text-gray-700">
                  {{ formGroup.value.amount }} {{ exchangeRate.base_code }} =
                </p>
                <p class="text-3xl font-semibold leading-loose text-gray-800">
                  <span>{{ exchangeRate.conversion_result }}</span>
                  {{ exchangeRate.target_data.currency_name }}
                </p>
                <div class="mb-6 text-left text-sm text-gray-700">
                  <p>
                    1 {{ exchangeRate.base_code }} = {{ exchangeRate.conversion_rate }} {{ exchangeRate.target_code }}
                  </p>
                </div>
              </div>
            </div>
          }

          <div class="mt-5 lg:ml-auto">
            <button class="w-full lg:w-auto" size="lg" hlmBtn type="submit">Convert</button>
          </div>
        </div>
      </div>
    </form>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class LandingHeroFormComponent implements OnInit {
  private readonly _appService = inject(AppService);
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _destroyRef = inject(DestroyRef);

  readonly supportedCurrencies = this._appService.supportedCurrencies;

  exchangeRate$: Observable<ExchangeRateEnrichedResponse & ExchangeRatePairConversionResponse> | undefined;

  readonly formGroup = this._formBuilder.group({
    amount: ['', Validators.required],
    from: ['', Validators.required],
    to: ['', Validators.required],
  });

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        filter(() => this.exchangeRate$ !== undefined),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.exchangeRate$ = undefined;
      });

    const [from, to] = this._appService.getSelectedCurrencies();
    this.formGroup.patchValue({ from, to });
  }

  switchCurrencies(): void {
    this.formGroup.patchValue({
      from: this.formGroup.controls.to.value,
      to: this.formGroup.controls.from.value,
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const { from, to, amount } = this.formGroup.getRawValue();
    this._appService.saveSelectedCurrencies(from, to);

    this.exchangeRate$ = this._appService.getExchangeRate(from, to, +amount).pipe(
      combineLatestWith(this._appService.getExchangeRateEnriched(from, to)),
      map(([exchangeRate, exchangeRateEnriched]) => ({ ...exchangeRate, ...exchangeRateEnriched })),
    );
  }
}
