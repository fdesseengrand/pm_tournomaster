// src/app/services/auth.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { APP_ROUTES } from "../constants/routes.constants";
import { Credentials, Tokens } from "./auth.interface";

/**
 * Authentication service.
 */
@Injectable({
  providedIn: "root",
})
export class AuthService {
  /**
   * Access token key for the local storage.
   */
  readonly ACCESS_TOKEN_STORAGE_KEY = "access_token";

  /**
   * Refresh token key for the local storage.
   */
  readonly REFRESH_TOKEN_STORAGE_KEY = "refresh_token";

  /**
   * Subject to notify the user's authentication status.
   */
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  /**
   * Constructor.
   * @param http The Http client.
   * @param router The router service.
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Logs the user in.
   * @param credentials The user's credentials.
   */
  login(credentials: Credentials): Observable<Tokens> {
    return this.http.post<Tokens>("auth/login", credentials).pipe(
      tap((tokens) => {
        this.storeTokens(tokens);
        this.isAuthenticated$.next(true);
        this.router.navigate([APP_ROUTES.consultation]);
      })
    );
  }

  /**
   * Logs the user out.
   */
  logout() {
    localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_STORAGE_KEY);
    tap(() => this.isAuthenticated$.next(false));

    this.router.navigate([APP_ROUTES.login]);
  }

  /**
   * Refreshee the access token.
   */
  refreshAccessToken(): Observable<Tokens> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_STORAGE_KEY);

    if (!refreshToken) {
      return throwError(() => new Error("Failed to refresh access token"));
    }
    return this.http.post<Tokens>("auth/refresh", { refresh_token: refreshToken }).pipe(
      tap((tokens) => this.storeTokens(tokens)),
      catchError(() => {
        this.logout();
        return throwError(() => new Error("Failed to refresh access token"));
      })
    );
  }

  /**
   * Stores the authentication tokens.
   * @param tokens The tokens.
   */
  private storeTokens(tokens: Tokens) {
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
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
    const payload = JSON.parse(atob(token.split(".")[1]));
    // Conversion of UNIX date in ms
    const expirationDate = payload.exp * 1000;
    return Date.now() > expirationDate;
  }

  /**
   * Checks if the token exists and is valid.
   */
  checkAuth(): Observable<boolean> {
    const token = this.accessToken;
    if (token && !this.isTokenExpired(token)) {
      return of(true);
    } else if (token && this.refreshToken) {
      return this.refreshAccessToken().pipe(
        tap(() => this.isAuthenticated$.next(true)),
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
