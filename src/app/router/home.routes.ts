import { Routes } from '@angular/router';

import { ChangePasswordComponent } from '../component/change-password/change-password.component';
import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { HomeComponent } from '../component/home/home.component';
import { NotFoundComponent } from '../component/not-found/not-found.component';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                // The canLoadModule guard is not attached here. It only lets a route through once a
                // current menu is set, and nothing sets one yet. Add `canMatch: [canLoadModule]` when it does.
                path: 'changePassword',
                component: ChangePasswordComponent
            },
            {
                path: '**',
                component: NotFoundComponent
            }
        ]
    }
];
