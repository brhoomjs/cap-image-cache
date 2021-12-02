import { ModuleWithProviders, NgModule } from '@angular/core';
import { CapImageCacheDirective } from './lib/cap-image-cache.directive';
import {
  CACHE_PATH,
  CapImageCacheService,
} from './lib/cap-image-cache.service';

export * from './lib/cap-image-cache.service';
export * from './lib/cap-image-cache.directive';

export class CapImageCacheConfig {
  cachePath?: string;
}
@NgModule({
  declarations: [CapImageCacheDirective],
  exports: [CapImageCacheDirective],
})
export class CapImageCacheModule {
  static forRoot(
    config: CapImageCacheConfig = {}
  ): ModuleWithProviders<CapImageCacheModule> {
    return {
      ngModule: CapImageCacheModule,
      providers: [
        { provide: CACHE_PATH, useValue: config.cachePath },
        { provide: CapImageCacheService, useValue: config },
      ],
    };
  }
}
