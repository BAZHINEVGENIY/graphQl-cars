import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  set(key: string, data: any) {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      const value = sessionStorage.getItem(key);
      if (value) return JSON.parse(value);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  initializeStorage(...args: Array<string>) {
    let lenghtArgs = args.length - 1;
    while (lenghtArgs >= 0) {
      const value = this.get(args[lenghtArgs]);
      const isValue = !value?.length && !value;
      isValue ? sessionStorage.setItem(args[lenghtArgs--], '""') : lenghtArgs--;
    }
  }
}
