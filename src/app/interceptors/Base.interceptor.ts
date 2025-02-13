import { HttpResponse, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { BaseResponse } from '../interfaces/base.interface';

export const baseInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(MatSnackBar);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
          const response: BaseResponse = event.body as BaseResponse;

          if(response.message !== ''){
            snackbarService.openFromComponent(SnackbarComponent, {
              duration: 3000,
              data: response
            })
          }
        }
      }
    })
  );
};
