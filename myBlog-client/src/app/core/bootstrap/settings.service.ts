import { Injectable } from '@angular/core';
import { LocalStorageService } from '@shared/services/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings, defaults } from '../settings';

export const USER_KEY = 'usr';
export const BLOG_KEY = 'blg';
export const URL_KEY = 'url';
export const PARAM_KEY = 'param';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface Blog {
  id?: string;
  title?: string;
  content?: string;
  publisher?: string;
  lastModified?: string;
}

export interface URL {
  url?: string;
}

export interface PARAM{
  needsRefresh?: Boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private store: LocalStorageService) {}

  private options = defaults;

  get notify(): Observable<any> {
    return this.notify$.asObservable();
  }
  private notify$ = new BehaviorSubject<any>({});

  setLayout(options?: AppSettings): AppSettings {
    this.options = Object.assign(defaults, options);
    return this.options;
  }

  setNavState(type: string, value: boolean) {
    this.notify$.next({ type, value } as any);
  }

  getOptions(): AppSettings {
    return this.options;
  }

  get URL() {
    return "http://172.26.108.157";
  }

  get PARAM() {
    return this.store.get(PARAM_KEY);
  }

  setParam(value: PARAM) {
    this.store.set(PARAM_KEY, value);
  }

  /** User information */

  get user() {
    return this.store.get(USER_KEY);
  }

  setUser(value: User) {
    this.store.set(USER_KEY, value);
  }

  removeUser() {
    this.store.remove(USER_KEY);
  }

  /** Blog */
  get blog(){
    return this.store.get(BLOG_KEY);
  }

  setBlog(value: Blog) {
    this.store.set(BLOG_KEY, value);
  }


  /** System language */

  get language() {
    return this.options.language;
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.notify$.next({ lang });
  }
}
