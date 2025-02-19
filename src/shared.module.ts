import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppService } from 'src/app/core/services/app.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule, provideScrollbarOptions } from 'ngx-scrollbar';
import { DataTableModule } from '@bhplugin/ng-datatable';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HighlightModule, provideHighlightOptions } from 'ngx-highlightjs';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { MenuModule } from 'headlessui-angular';
import { SortablejsModule } from '@dustfoundation/ngx-sortablejs';
import { QuillModule } from 'ngx-quill';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CountUpModule } from 'ngx-countup';
import { LightboxModule } from 'ngx-lightbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from '@matheo/text-mask';
import { NouisliderModule } from 'ng2-nouislider';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
    imports: [
        CommonModule,
        QuillModule.forRoot(),
        FlatpickrModule.forRoot(),
        TranslateModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgScrollbarModule,
        DataTableModule,
        MenuModule,
        NgxTippyModule,
        NgApexchartsModule,
        HighlightModule,
        SortablejsModule,
        IconModule,
        NgxCustomModalComponent,
        FullCalendarModule,
        CountUpModule,
        LightboxModule,
        NgSelectModule,
        TextMaskModule,
        NouisliderModule,
        ClipboardModule,
    ],
    declarations: [],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        NgScrollbarModule,
        DataTableModule,
        MenuModule,
        NgxTippyModule,
        NgApexchartsModule,
        HighlightModule,
        SortablejsModule,
        QuillModule,
        IconModule,
        NgxCustomModalComponent,
        FullCalendarModule,
        CountUpModule,
        LightboxModule,
        NgSelectModule,
        TextMaskModule,
        NouisliderModule,
        FlatpickrModule,
        ClipboardModule,
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [
                Title,
                AppService,
                provideScrollbarOptions({
                    visibility: 'hover',
                    appearance: 'compact',
                }),
                provideHighlightOptions({
                    coreLibraryLoader: () => import('highlight.js/lib/core'),
                    languages: {
                        json: () => import('highlight.js/lib/languages/json'),
                        typescript: () => import('highlight.js/lib/languages/typescript'),
                        xml: () => import('highlight.js/lib/languages/xml'),
                    },
                }),
            ],
        };
    }
}
