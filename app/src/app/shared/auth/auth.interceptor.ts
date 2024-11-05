import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { Tokens } from "./auth.interface";
import { AuthService } from "./auth.service";

/**
 * Authentication interceptor.
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const accessToken = authService.accessToken;
  let authReq = req;

  if (accessToken) {
    // If the user is logged in, adds the access token to the request.
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 && !authReq.url.includes("auth/refresh")) {
        // If the user is logged out, try to refresh the access token.
        return authService.refreshAccessToken().pipe(
          switchMap((tokens: Tokens) => {
            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${tokens.access_token}`,
              },
            });
            return next(newAuthReq);
          }),
          catchError((refreshError) => {
            authService.logout();
            router.navigate(["/login"]);
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
