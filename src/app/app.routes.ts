import {Routes} from '@angular/router';
import {TaskListComponent} from './components/task-list/task-list.component';
import {BoardsComponent} from './components/boards/boards.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login-form/login-form.component';
import {AuthGuard} from './services/auth-guard.service';
import {RegisterComponent} from './components/register/register.component';

export const routes: Routes = [
  {path: 'boards/:boardId/task-list', component: TaskListComponent, canActivate: [AuthGuard]},
  {path: 'boards', component: BoardsComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
