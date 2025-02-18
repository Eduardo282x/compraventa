import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { baseInterceptor } from './interceptors/Base.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
// import { BarController, Colors, Legend } from 'chart.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideCharts(withDefaultRegisterables()),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([baseInterceptor])
    ),
  ]
};
