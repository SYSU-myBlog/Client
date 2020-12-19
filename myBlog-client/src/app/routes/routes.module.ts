import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { BlogListComponent } from './dashboard/blog-list/blog-list.component';
import { BlogDetailComponent } from './dashboard/blog-detail/blog-detail.component';
import { BlogCreateComponent } from './dashboard/blog-create/blog-create.component';

const COMPONENTS = [DashboardComponent, LoginComponent, RegisterComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, BlogListComponent, BlogDetailComponent, BlogCreateComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RoutesModule {}
