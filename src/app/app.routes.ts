import {Routes} from '@angular/router';
import {TaskListComponent} from './components/task-list/task-list.component';
import {BoardsComponent} from './components/boards/boards.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
  {path: 'boards/:boardId/task-list', component: TaskListComponent},
  {path: 'boards', component: BoardsComponent},
  {path: '', component: HomeComponent}
];
