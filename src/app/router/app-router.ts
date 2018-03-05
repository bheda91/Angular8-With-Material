import { CanActivateUser } from '../shared/util/can-activate-user';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';

const popRoutes: Routes = [
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
        loadChildren: 'app/home.module#HomeModule',
        canActivate: [CanActivateUser]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(popRoutes)],
    exports: [RouterModule]
})

export class AppRouterModule { }