import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { StoreUiSharedModule } from '@bg-hoard/store/ui-shared';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: 'game/:id',
          loadChildren: () =>
            import('@bg-hoard/store/feature-game-detail').then(
              (m) => m.StoreFeatureGameDetailModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    MatCardModule,
    StoreUiSharedModule,
  ],
  providers: [
    {
      provide: 'baseUrl',
      useValue: environment.apiUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
