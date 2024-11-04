import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TaskComponent} from './components/task/task.component';
import {TaskListComponent} from "./components/task-list/task-list.component";
import {BoardsComponent} from './components/boards/boards.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskComponent, TaskListComponent, BoardsComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ericsson-frontend';
}
