import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Filesystem, Directory, WriteFileResult } from '@capacitor/filesystem';

export const CACHE_PATH = new InjectionToken<string>('CACHE_PATH');
@Injectable({ providedIn: 'any' })
export class CapImageCacheService {
  constructor(@Inject(CACHE_PATH) private cachePath: string = 'CACHE_IMAGES') {}
  public async getImageSrc(_url: string) {
    let newUrl = new URL(_url);
    const imageName = newUrl.pathname.split('/').pop();
    const imageType = (imageName || _url).split('.').pop();
    try {
      const readFile = await Filesystem.readFile({
        directory: Directory.Cache,
        path: this.cachePath + '/' + imageName,
      });
      return `data:image/${imageType};base64,${readFile.data}`;
    } catch (e) {
      await this.storeImage(_url, imageName || _url);
      const readFile = await Filesystem.readFile({
        directory: Directory.Cache,
        path: this.cachePath + '/' + imageName,
      });
      return `data:image/${imageType};base64,${readFile.data}`;
    }
  }
  private async storeImage(
    url: string,
    path: string
  ): Promise<WriteFileResult | unknown> {
    const response = await fetch(url);
    const blob = await response.blob();

    const base64Data = await this.convertBlobToBase64(blob);
    try {
      const savedFile = await Filesystem.writeFile({
        directory: Directory.Cache,
        data: base64Data,
        path: this.cachePath + '/' + path,
        recursive: true,
      });
      return savedFile;
    } catch (error: unknown) {
      return error;
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
