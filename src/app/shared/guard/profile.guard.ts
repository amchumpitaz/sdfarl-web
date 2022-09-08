import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivateChild } from '@angular/router';
import { Permit } from '../auth/permit';
import * as CryptoJS from 'crypto-js';

const PERMISSIONS_KEY = 'AuthPermissions';
const CRYPTO_KEY = '3*+Zzb*hb]8{{8{fn]nKeb&#AwA:!wEaZ5bEcH8^3yYDpf$TV74"Ht<F;&ju%6)';
const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivateChild {
  private permissions: Permit[];

  constructor(public router: Router) {
    this.permissions = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      const bytes = CryptoJS.AES.decrypt(sessionStorage.getItem(PERMISSIONS_KEY), CRYPTO_KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      let permit: Permit;
      decryptedData.forEach(permit => {
        this.permissions.push(permit);
      });
    }
  }
  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    const nameComponent = route.data.nameComponent;
    console.log(nameComponent);
    if (sessionStorage.getItem(TOKEN_KEY)) {
      if (this.verifiedAccess(nameComponent)) {
        this.router.navigate(['/access-denied']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  public verifiedAccess(component: string): boolean {
    const item = this.permissions.filter(
      permit => permit.permTipo === 'MENU' && permit.permEstado === '1' && permit.objAlias === component
    );
    console.log('item');
    return item.length === 0;
  }
}
