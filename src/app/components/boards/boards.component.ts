import {Component, OnInit} from '@angular/core';
import {BoardsService} from '../../services/boards.service';
import {Board} from '../../models/board.interface';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {CreateEditBoardComponent} from '../create-edit-board/create-edit-board.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [MatButton, MatCard, MatIconButton, MatIcon],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css'
})
export class BoardsComponent implements OnInit {
  boards: Board[] = [];

  constructor(private boardsService: BoardsService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchBoards();
  }

  fetchBoards(): void {
    this.boardsService.getAllBoards().subscribe(boards => {
      this.boards = boards
    })
  }

  openBoard(boardId: number): void {
    this.router.navigate([`boards/${boardId}/task-list`]);
  }

  deleteBoard(id: number): void {
    this.boardsService.deleteBoard(id).subscribe(() => {
      this.fetchBoards();
    });
  }

  openCreateBoardDialog(): void {
    const dialogRef = this.dialog.open(CreateEditBoardComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchBoards();
      }
    });
  }
}
