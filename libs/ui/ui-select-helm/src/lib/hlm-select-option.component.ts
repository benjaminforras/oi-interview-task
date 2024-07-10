import { ChangeDetectionStrategy, Component, Input, computed, inject, input } from '@angular/core';
import { lucideCheck } from '@ng-icons/lucide';
import { hlm } from '@spartan-ng/ui-core';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { BrnSelectOptionDirective } from '@spartan-ng/ui-select-brain';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-option',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [BrnSelectOptionDirective],
  providers: [provideIcons({ lucideCheck })],
  host: {
    '[class]': '_computedClass()',
  },
  template: `
    <ng-content />
  `,
  imports: [HlmIconComponent],
})
export class HlmSelectOptionComponent {
  protected readonly _brnSelectOption = inject(BrnSelectOptionDirective, { host: true });
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2  rtl:flex-reverse rtl:pr-8 rtl:pl-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      this.userClass(),
    ),
  );

  @Input()
  set value(value: unknown | null) {
    this._brnSelectOption.value = value;
  }

  @Input()
  public disabled = false;
}
