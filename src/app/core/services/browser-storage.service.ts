import { Injectable, inject } from '@angular/core';
import { BROWSER_STORAGE } from '../tokens/browser-storage.token';

@Injectable({ providedIn: 'root' })
export class BrowserStorageService {
  private storage = inject(BROWSER_STORAGE);

  getItem(key: string): string {
    return this.storage.getItem(key) || '';
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  clear() {
    this.storage.clear();
  }
}
