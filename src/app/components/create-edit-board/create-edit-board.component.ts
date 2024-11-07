import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatError, MatFormField} from '@angular/material/form-field';
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
    MatSelect,
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './create-edit-board.component.html',
  styleUrl: './create-edit-board.component.css'
})
export class CreateEditBoardComponent {
  boardForm = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  constructor(private dialogRef: MatDialogRef<CreateEditBoardComponent>,
              private boardsService: BoardsService) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createBoard(): void {
    if (this.boardForm.valid) {
      const newBoard: Omit<Board, 'id'> = {
        name: this.boardForm.get('name')?.value || ''
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
