import {Routes} from '@angular/router';
import {TaskListComponent} from './components/task-list/task-list.component';
import {BoardsComponent} from './components/boards/boards.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login-form/login-form.component';

export const routes: Routes = [
  {path: 'boards/:boardId/task-list', component: TaskListComponent},
  {path: 'boards', component: BoardsComponent},
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent}
];
