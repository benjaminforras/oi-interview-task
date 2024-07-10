import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingHeroFooterComponent } from './components/landing-hero-footer/landing-hero-footer.component';
import { LandingHeroFormComponent } from './components/landing-hero-form/landing-hero-form.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, LandingHeroFooterComponent, LandingHeroFormComponent],
  selector: 'app-root',
  template: `
    <div class="relative bg-gradient-to-bl from-blue-100 via-transparent dark:from-blue-950 dark:via-transparent">
      <div class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div class="flex flex-col items-center">
          <div class="mt-4 max-w-2xl md:mb-12">
            <h1 class="mb-4 text-4xl font-semibold text-gray-800 lg:text-5xl dark:text-neutral-200">
              Currency Converter
            </h1>
            <p class="text-gray-600 dark:text-neutral-400">Check live currency exchange rates</p>
          </div>

          <app-landing-hero-form />
        </div>

        <app-landing-hero-footer />
      </div>
    </div>
  `,
})
export class AppComponent {}
