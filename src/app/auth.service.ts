import {TestBed, inject} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {tokenNotExpired} from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

const AUTH0_CLIENT_ID = 'Ei58_6LoPsUZs32wcAId5XHartWe3hXg';
const AUTH0_DOMAIN = 'davidm.eu.auth0.com';

const ID_TOKEN = 'id_token';

@Injectable()
export class AuthService {
  lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {});

  constructor() {
    this.lock.on('authenticated', (authResult => {
      localStorage.setItem(ID_TOKEN, authResult.idToken)
    }));
  }

  signIn() {
    this.lock.show();
  }

  signOut() {
    localStorage.removeItem(ID_TOKEN);
  }

  authenticated() {
    return tokenNotExpired();
  }
}


