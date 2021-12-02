import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CapImageCacheService } from './cap-image-cache.service';

@Directive({ selector: '[cache-img]' })
export class CapImageCacheDirective implements OnInit {
  @Input('cache-img') _src: string | undefined;
  @Input('bg') backgroundStyle: boolean | undefined;
  constructor(
    private readonly element: ElementRef,
    private capImageCacheService: CapImageCacheService
  ) {}
  async ngOnInit() {
    if (this._src) {
      const src = await this.capImageCacheService.getImageSrc(this._src);
      if (this.backgroundStyle) {
        this.element.nativeElement.style.backgroundImage = `url('${src}')`;
      } else {
        this.element.nativeElement.src = src;
      }
    }
  }
}
