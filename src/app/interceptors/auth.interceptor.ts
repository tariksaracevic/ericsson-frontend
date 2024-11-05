import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Retrieve the token

  const skipUrls = ['/api/auth/register', '/api/auth/authenticate'];

  const shouldSkip = skipUrls.some(url => req.url.includes(url));


  // Clone the request to add the Authorization header
  if (token && !shouldSkip) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  // If no token, forward the original request
  return next(req);
};
