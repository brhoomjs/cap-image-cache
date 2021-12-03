import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Filesystem, Directory, WriteFileResult } from '@capacitor/filesystem';

export const CACHE_PATH = new InjectionToken<string>('CACHE_PATH');
export interface ImageCacheResult {
  data?: string;
  from?: 'cache' | 'network';
}
@Injectable({ providedIn: 'any' })
export class CapImageCacheService {
  constructor(@Inject(CACHE_PATH) private cachePath: string = 'CACHE_IMAGES') {}
  public async getImageSrc(_url: string): Promise<ImageCacheResult> {
    let newUrl = new URL(_url);
    const imageName = newUrl.pathname.split('/').pop();
    const imageType = (imageName || _url).split('.').pop();
    try {
      const readFile = await Filesystem.readFile({
        directory: Directory.Cache,
        path: this.cachePath + '/' + imageName,
      });
      return {
        data: `data:image/${imageType};base64,${readFile.data}`,
        from: 'cache',
      };
    } catch (e) {
      try {
        await this.storeImage(_url, imageName || _url);
        const readFile = await Filesystem.readFile({
          directory: Directory.Cache,
          path: this.cachePath + '/' + imageName,
        });
        return {
          data: `data:image/${imageType};base64,${readFile.data}`,
          from: 'network',
        };
      } catch (error) {
        throw new Error("there's a network error 2");
      }
    }
  }
  private async storeImage(
    url: string,
    path: string
  ): Promise<WriteFileResult | unknown> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      if (blob.type === 'text/html') {
        console.error('response wan not an image');
        throw new Error('There was an error while loading an image');
      }
      const base64Data = await this.convertBlobToBase64(blob);
      const savedFile = await Filesystem.writeFile({
        directory: Directory.Cache,
        data: base64Data,
        path: this.cachePath + '/' + path,
        recursive: true,
      });
      return savedFile;
    } catch (error: unknown) {
      throw new Error("there's a network error");
    }
  }
  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (reader !== null) {
          const res = reader.result || '';
          resolve(res.toString());
        } else {
          reject('Error #F00');
        }
      };
      reader.readAsDataURL(blob);
    });
  }
}
