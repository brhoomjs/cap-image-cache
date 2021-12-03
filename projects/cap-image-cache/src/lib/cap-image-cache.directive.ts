import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { CapImageCacheService } from './cap-image-cache.service';

@Directive({ selector: '[cache-img]' })
export class CapImageCacheDirective implements AfterViewInit {
  @Input('cache-img') _src: string | undefined;
  @Input('lazy') _lazy: boolean = false;
  private _alreadyRendered: boolean = false;
  private _observer: IntersectionObserver | undefined;
  constructor(
    private readonly element: ElementRef,
    private capImageCacheService: CapImageCacheService
  ) {}

  async ngAfterViewInit() {
    if (this._lazy) {
      this.startObserving();
    } else {
      this.loadImage();
    }
  }
  private async loadImage() {
    if (this._src) {
      try {
        const result = await this.capImageCacheService.getImageSrc(this._src);
        if (this.element.nativeElement.nodeName !== 'IMG') {
          this.element.nativeElement.style.backgroundImage = `url('${result.data}')`;
        } else {
          this.element.nativeElement.src = result.data;
        }
        console.info(this._src, 'Loaded successfully from', result.from);
      } catch (error) {
        throw new Error('cannot load image check your url');
      }
    } else {
      throw new Error('image src url is not set');
    }
  }
  private startObserving() {
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.renderContents(entry.isIntersecting);
        });
      },
      { threshold: [0, 0.1, 0.9, 1] }
    );
    this._observer?.observe(this.element.nativeElement);
  }
  private renderContents(isInView: boolean) {
    if (isInView) {
      if (!this._alreadyRendered) {
        this._alreadyRendered = true;
        this._observer?.disconnect();
        this.loadImage();
      }
    }
  }
}
