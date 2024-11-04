import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/task.intefrace';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatCard, MatCardContent, MatCardHeader, MatIcon],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task!: Task;
  @Input() boardId!: number;   // Add boardId as an input
  @Input() columnId!: number;  // Add columnId as an input
  @Output() taskDeleted = new EventEmitter<void>(); // Emit event when task is deleted

  constructor(private taskService: TaskService) {
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.boardId, this.columnId, this.task.id).subscribe(() => {
      console.log(`Task with id ${this.task.id} deleted.`);
      this.taskDeleted.emit(); // Notify parent component
    });
  }

}

