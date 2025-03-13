import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  get webApp() {
    return (window as any).Telegram?.WebApp;
  }

  getInitData() {
    return (window as any).Telegram?.WebApp?.initData || '';
  }

  getInitDataUnsafe() {
    return (window as any).Telegram?.WebApp?.initDataUnsafe || '';
  }
  
  get userId() {
    return this.getInitDataUnsafe().user?.id;
  }
}
