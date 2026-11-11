import { Routes } from '@angular/router';

import { LoginComponent } from '../component/login/login.component';
import { canActivateUser } from '../shared/util/can-activate-user';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./home.routes').then(m => m.HOME_ROUTES),
        canActivate: [canActivateUser]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
