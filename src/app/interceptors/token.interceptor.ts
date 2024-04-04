import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  req = addToken(req);
  return next(req);
};

function addToken(request: HttpRequest<unknown>) {
  const tokenSrv = inject(TokenService);
  const token = tokenSrv.getToken();
  if (tokenSrv.isAuthenticated()) {
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    return authReq;
  }
  return request;
}
