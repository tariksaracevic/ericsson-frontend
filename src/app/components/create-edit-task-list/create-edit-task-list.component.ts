import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ColumnService} from '../../services/column.service';
import {Column} from '../../models/task-list.interface';

@Component({
  selector: 'app-create-edit-column',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDialogTitle,
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './create-edit-task-list.component.html',
  styleUrl: './create-edit-task-list.component.css'
})
export class CreateEditTaskListComponent {
  taskListForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  boardId: number;

  constructor(
    private dialogRef: MatDialogRef<CreateEditTaskListComponent>,
    private columnService: ColumnService,
    @Inject(MAT_DIALOG_DATA) private data: { boardId: number }
  ) {
    this.boardId = data.boardId;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createColumn(): void {
    if (this.taskListForm.get('name')?.valid) {
      const newColumn: Omit<Column, 'id'> = {
        name: this.taskListForm.get('name')?.value || '',
        boardId: this.boardId,
        tasks: [],
      };

      this.columnService.createColumn(newColumn).subscribe(
        (createdColumn) => {
          this.dialogRef.close(createdColumn);
        },
        (error) => {
          console.error('Error creating Column:', error);
        }
      );
    } else {
      console.warn("Name is required.");
    }
  }
}
