// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { APP_ROUTES } from '../constants/routes.constants';
import { Credentials, Tokens } from './auth.interface';

/**
 * Authentication service.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    /**
     * Access token key for the local storage.
     */
    readonly ACCESS_TOKEN_STORAGE_KEY = 'access_token';

    /**
     * Refresh token key for the local storage.
     */
    readonly REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

    /**
     * Constructor.
     * @param http The Http client.
     * @param router The router service.
     */
    constructor(private http: HttpClient, private router: Router) { }

    /**
     * Logs the user in.
     * @param credentials The user's credentials.
     */
    login(credentials: Credentials): Observable<Tokens> {
        return this.http.post<Tokens>('auth/login', credentials).pipe(
            tap((tokens) => {
                this.storeTokens(tokens);
                this.router.navigate([APP_ROUTES.consultation]);
            })
        )
    }

    /**
     * Refreshee the access token.
     */
    refreshAccessToken(): Observable<undefined> {
        const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_STORAGE_KEY);
        return this.http.post('auth/refresh', { refresh_token: refreshToken }).pipe(
            tap((tokens: any) => this.storeTokens(tokens))
        );
    }

    /**
     * Stores the authentication tokens.
     * @param tokens The tokens.
     */
    private storeTokens(tokens: Tokens) {
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
    }

    /**
     * Checks if a token is expired.
     * @param token The token.
     */
    private isTokenExpired(token: string): boolean {
        if (!token) {
            return false;
        }

        // Decodes the payload part of the JWT token
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Conversion of UNIX date in ms
        const expirationDate = payload.exp * 1000;
        return Date.now() > expirationDate;
    }

    /**
     * Logs the user out.
     */
    logout() {
        localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_STORAGE_KEY);
        this.router.navigate([APP_ROUTES.login]);
    }

    /**
     * Checks if the token exists and is valid.
     */
    isAuthenticated(): Observable<boolean> {
        const token = this.accessToken;
        if (token && !this.isTokenExpired(token)) {
            return of(true);
        } else if (token && this.refreshToken) {
            return this.refreshAccessToken().pipe(
                map(() => true),
                catchError(() => {
                    this.logout();
                    return of(false);
                })
            );
        } else {
            this.logout();
            return of(false);
        }
    }

    /**
     * Gets the access token.
     */
    get accessToken(): string | null {
        return localStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY);
    }

    /**
     * Gets the refresh token.
     */
    get refreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_STORAGE_KEY);
    }
}
