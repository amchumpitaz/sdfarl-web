import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const NAME_KEY = 'AuthName';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveNombres(username: string) {
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, username);
  }

  public getNombres(): string {
    return sessionStorage.getItem(NAME_KEY);
  }

  public saveData(data: any) {
    window.sessionStorage.removeItem('data');
    window.sessionStorage.setItem('data', JSON.stringify(data));
  }

  public getData(): string {
    return sessionStorage.getItem('data');
  }

  public saveAuthorities(authorities: any) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, authorities);
    // window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): any {
    return sessionStorage.getItem(AUTHORITIES_KEY);
    // this.roles = [];

    // if (sessionStorage.getItem(TOKEN_KEY)) {
    //   JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
    //     this.roles.push(authority.authority);
    //   });
    // }

    // return this.roles;

  }
}
