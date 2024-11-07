import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatError, MatFormField} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/task.intefrace';

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
    MatDialogTitle,
    MatError,
    ReactiveFormsModule
  ]
})
export class CreateEditTaskComponent {
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })
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
    this.dialogRef.close();
  }

  createTask(): void {
    if (this.taskForm.get('title')?.valid && this.taskForm.get('description')?.valid) {
      const newTask: Omit<Task, 'id'> = {
        title: this.taskForm.get('title')?.value || '',
        description: this.taskForm.get('description')?.value || '',
        column_id: this.columnId
      };

      this.taskService.createTask(this.boardId, this.columnId, newTask).subscribe(
        (createdTask) => {
          this.dialogRef.close(createdTask);
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
