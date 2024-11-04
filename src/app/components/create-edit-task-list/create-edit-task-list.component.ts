import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
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
    MatDialogTitle
  ],
  templateUrl: './create-edit-task-list.component.html',
  styleUrl: './create-edit-task-list.component.css'
})
export class CreateEditTaskListComponent {
  name = '';
  boardId: number; // Add a property for boardId

  constructor(
    private dialogRef: MatDialogRef<CreateEditTaskListComponent>,
    private columnService: ColumnService,
    @Inject(MAT_DIALOG_DATA) private data: { boardId: number } // Injecting the boardId
  ) {
    this.boardId = data.boardId; // Assign the boardId from the dialog data
  }

  closeDialog(): void {
    this.dialogRef.close(); // Close without returning data
  }

  createColumn(): void {
    if (this.name) {
      const newColumn: Omit<Column, 'id'> = {
        name: this.name,
        boardId: this.boardId, // Include the boardId here
        tasks: [],
      };

      this.columnService.createColumn(newColumn).subscribe(
        (createdColumn) => {
          console.log('Column created:', createdColumn);
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
