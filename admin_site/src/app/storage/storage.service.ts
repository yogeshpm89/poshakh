import { Injectable } from '@angular/core';

export const localStorage = window.localStorage;
export const sessionStorage = window.sessionStorage;

@Injectable()
export class StorageService {
  
  saveInLocalStorage(key, value): void {
    localStorage.setItem(key, value);
  };

  saveInSessionStorage(key, value): void {
    sessionStorage.setItem(key, value);
  }

  findInLocalStorage(key): string {
    return localStorage.getItem(key);
  };

  findInSessionStorage(key): string {
    return sessionStorage.getItem(key);
  };

}
