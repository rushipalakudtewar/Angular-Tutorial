import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { counterReducer } from './shared/store/counter.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { blogReducer } from './shared/store/blog/blog.reducer';
import { AppState } from './shared/store/global/App.state';
import { provideEffects } from '@ngrx/effects';
import { BlogEffect } from './shared/store/blog/blog.effect';
import { provideHttpClient } from '@angular/common/http';
import { AppEffects } from './shared/store/global/App.effect';
import { provideRouterStore } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(AppState),
    provideAnimationsAsync(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(BlogEffect, AppEffects), provideHttpClient(), provideRouterStore()]
};
  