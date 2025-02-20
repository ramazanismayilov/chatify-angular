import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.route';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { indexReducer } from './store/index.reducer';
import { SharedModule } from 'src/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';
import { HeaderComponent } from './layouts/header';
import { FooterComponent } from './layouts/footer';
import { SidebarComponent } from './layouts/sidebar';
import { ThemeCustomizerComponent } from './layouts/theme-customizer';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';

export function HttpLoaderFactory(httpHandler: HttpBackend): TranslateHttpLoader {
    return new TranslateHttpLoader(new HttpClient(httpHandler));
}

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpBackend],
            },
        }),
        StoreModule.forRoot({ index: indexReducer }),
        SharedModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        ThemeCustomizerComponent,
        AppLayout,
        AuthLayout,
    ],
    providers: [
        Title,
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
