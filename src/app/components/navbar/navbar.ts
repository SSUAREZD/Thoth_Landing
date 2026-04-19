import { Component, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  appUrl = environment.appUrl;

  isLangOpen = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.isLangOpen) {
      this.isLangOpen = false;
    }
  }

  toggleLangMenu(event: Event) {
    event.stopPropagation();
    this.isLangOpen = !this.isLangOpen;
    console.log("toggle:", this.isLangOpen); // debug
  }

  changeLang(lang: string) {
    this.isLangOpen = false;

    const interval = setInterval(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;

      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));

        clearInterval(interval);
      }
    }, 100);
  }
}
  
