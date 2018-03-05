import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

/*************** Third party libs *****************/
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

/************************** Third party modules **************************/
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
} from '@angular/material';

@NgModule({
    exports: [
        CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
    ]
})
export class AllMaterialModule { }

/************** Components ***********************/
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { HomeComponent } from './component/home/home.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';

/************** Services ************************/
import { ConfigService } from './shared/service/config.service';
import { HttpService } from './shared/service/http.service';

import { HomeRouterModule } from './router/home-router';

@NgModule({
    imports: [
        AllMaterialModule,
        CommonModule,
        FormsModule,
        HomeRouterModule,
        HttpModule,
        NgxDatatableModule
    ],
    declarations: [
        ChangePasswordComponent,
        DashboardComponent,
        NotFoundComponent,
        HomeComponent
    ],
    providers: [
        ConfigService,
        HttpService
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule { }
