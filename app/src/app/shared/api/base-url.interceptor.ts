import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

/**
 * Adds the API base url to the application requests.
 * @param req The request.
 * @param next The Http handler.
 */
export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  // Only add the base URL if it's not already an absolute URL
  const apiReq = req.url.startsWith('http')
    ? req
    : req.clone({ url: `${environment.apiBaseUrl}/${req.url}` });

  return next(apiReq);
};
