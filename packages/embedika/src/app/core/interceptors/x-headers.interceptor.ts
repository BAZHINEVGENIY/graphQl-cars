import { HttpInterceptorFn } from '@angular/common/http';

export const xHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: {
      'x-client-id': '6412ccd87777bc4ea27d01cb',
      'x-app-id': '6412ccd87777bc4ea27d01cd',
    },
  });
  return next(req);
};
