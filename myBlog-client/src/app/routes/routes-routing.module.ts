import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserinfoComponent } from '../shared/components/userinfo/userinfo.component';
import { MineListComponent } from './mineList/mineList.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { BlogListComponent } from './dashboard/blog-list/blog-list.component';
import { BlogDetailComponent } from './dashboard/blog-detail/blog-detail.component';
import { BlogCreateComponent } from './dashboard/blog-create/blog-create.component';
import { AuthGuard } from '@core';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'mineList',
        component: MineListComponent,
        data: { title: 'MineList', titleI18n: 'mineList' },
      },
      {
        path: 'userinfo',
        component: UserinfoComponent,
        data: { title: 'Userinfo', titleI18n: 'userinfo' },
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', titleI18n: 'Login' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register', titleI18n: 'Register' },
      },
    ],
  },
  {
    path: 'article',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'list',
        component: BlogListComponent,
        data: { title: 'list', titleI18n: 'list' },
      },
      {
        path: 'detail',
        component: BlogDetailComponent,
        data: { title: 'detail', titleI18n: 'detail' },
      },
      {
        path: 'create',
        component: BlogCreateComponent,
        data: { title: 'create', titleI18n: 'create' },
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
