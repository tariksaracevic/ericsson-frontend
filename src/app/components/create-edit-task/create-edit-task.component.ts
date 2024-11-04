import {Component, Inject, Input} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/task.intefrace';
import {Board} from '../../models/board.interface';

@Component({
  selector: 'app-create-edit-task',
  standalone: true,
  templateUrl: './create-edit-task.component.html',
  styleUrls: ['./create-edit-task.component.css'],
  imports: [
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    MatInput,
    MatDialogTitle
  ]
})
export class CreateEditTaskComponent {
  title: string = '';
  description: string = '';
  boardId: number;
  columnId: number;

  constructor(
    private dialogRef: MatDialogRef<CreateEditTaskComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) private data: { boardId: number, columnId: number }
  ) {
    this.boardId = data.boardId;
    this.columnId = data.columnId;
  }

  closeDialog(): void {
    this.dialogRef.close(); // Close without returning data
  }

  createTask(): void {
    if (this.title && this.description) {
      // Include column_id when creating a new task
      const newTask: Omit<Task, 'id'> = {
        title: this.title,
        description: this.description,
        column_id: this.columnId // Add the column_id property here
      };

      this.taskService.createTask(this.boardId, this.columnId, newTask).subscribe(
        (createdTask) => {
          console.log('Task created:', createdTask);
          this.dialogRef.close(createdTask); // Close and return created task
        },
        (error) => {
          console.error('Error creating Task:', error);
        }
      );
    } else {
      console.warn("Title and description are required.");
    }
  }
}
