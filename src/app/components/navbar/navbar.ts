import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  appUrl = environment.appUrl;
  currentLang: 'es' | 'en' = 'es';

  ngOnInit() {
    if (typeof window === 'undefined') {
      return;
    }

    const savedLang = window.localStorage.getItem('thothLang');
    this.currentLang = savedLang === 'en' ? 'en' : 'es';
  }

  get languageButtonLabel() {
    return this.currentLang === 'es' ? 'EN' : 'ES';
  }

  toggleLanguage() {
    const targetLang = this.currentLang === 'es' ? 'en' : 'es';
    this.changeLang(targetLang);
  }

  private changeLang(lang: 'es' | 'en') {
    if (typeof window === 'undefined') {
      return;
    }

    this.currentLang = lang;
    window.localStorage.setItem('thothLang', lang);
    this.setGoogleTranslateCookie(lang);

    const interval = setInterval(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;

      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));

        clearInterval(interval);
      }
    }, 100);

    window.setTimeout(() => {
      window.location.reload();
    }, 250);
  }

  private setGoogleTranslateCookie(lang: 'es' | 'en') {
    const value = `/es/${lang}`;
    document.cookie = `googtrans=${value}; path=/`;
    document.cookie = `googtrans=${value}; domain=${window.location.hostname}; path=/`;
  }
}
  
