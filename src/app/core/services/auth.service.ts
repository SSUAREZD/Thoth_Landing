import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserDTO } from '../models/models';

const SESSION_KEY = 'thoth_user';
const ADMIN_KEY = 'thoth_admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  private _currentUser = signal<UserDTO | null>(this.loadSession());
  private _isAdmin = signal<boolean>(this.loadAdmin());

  readonly currentUser = this._currentUser.asReadonly();
  readonly isAdmin = this._isAdmin.asReadonly();
  readonly isLoggedIn = computed(() => this._currentUser() !== null);

  login(user: UserDTO): void {
    this._currentUser.set(user);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
  }

  logout(): void {
    this._currentUser.set(null);
    this._isAdmin.set(false);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(ADMIN_KEY);
    }
  }

  setAdmin(value: boolean): void {
    this._isAdmin.set(value);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(ADMIN_KEY, String(value));
    }
  }

  private loadSession(): UserDTO | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private loadAdmin(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return sessionStorage.getItem(ADMIN_KEY) === 'true';
  }
}
