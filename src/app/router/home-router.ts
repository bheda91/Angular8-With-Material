import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { HomeComponent } from '../component/home/home.component';
import { NotFoundComponent } from '../component/not-found/not-found.component';
import { ChangePasswordComponent } from '../component/change-password/change-password.component';
import { CanLoadModuleService } from '../shared/service/can-load-module.service';

const popHomeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'changePassword',
                component: ChangePasswordComponent,
                canLoad: [CanLoadModuleService]
            },
            {
                path: '**',
                component: NotFoundComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(popHomeRoutes)],
    exports: [RouterModule]
})

export class HomeRouterModule { }