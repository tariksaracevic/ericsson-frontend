import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {Task} from '../../models/task.intefrace';
import {Board} from '../../models/board.interface';
import {BoardsService} from '../../services/boards.service';

@Component({
  selector: 'app-create-edit-board',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect
  ],
  templateUrl: './create-edit-board.component.html',
  styleUrl: './create-edit-board.component.css'
})
export class CreateEditBoardComponent {
  name = '';

  constructor(private dialogRef: MatDialogRef<CreateEditBoardComponent>,
              private boardsService: BoardsService) {
  }

  closeDialog(): void {
    this.dialogRef.close(); // Close without returning data
  }

  createBoard(): void {
    if (this.name) {
      const newBoard: Omit<Board, 'id'> = {
        name: this.name
      };

      this.boardsService.createBoard(newBoard).subscribe(
        (createdBoard) => {
          console.log('Board created:', createdBoard);
          this.dialogRef.close(createdBoard);
        },
        (error) => {
          console.error('Error creating board:', error);
        }
      );
    } else {
      console.warn("Name is required.");
    }
  }
}
