import {Component, OnInit} from '@angular/core';
import {TaskComponent} from '../task/task.component';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/task.intefrace'
import {MatCard, MatCardHeader} from '@angular/material/card';
import {MatList} from '@angular/material/list';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute} from '@angular/router';
import {CreateEditTaskComponent} from '../create-edit-task/create-edit-task.component';
import {MatDialog} from '@angular/material/dialog';
import {BoardsService} from '../../services/boards.service';
import {Board} from '../../models/board.interface';
import {ColumnService} from '../../services/column.service';
import {Column} from '../../models/task-list.interface';
import {CreateEditTaskListComponent} from '../create-edit-task-list/create-edit-task-list.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskComponent, MatCard, MatCardHeader, MatList, MatButton, MatIconButton, MatIcon, CdkDrag, CdkDropList, CdkDropListGroup, NgForOf],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  columns: Column[] = [];
  boardName: string = '';
  boardId: number | undefined;
  connectedTo: string[] = [];

  constructor(
    private taskService: TaskService,
    private boardsService: BoardsService,
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.boardId = Number(params.get('boardId'));
      if (this.boardId) {
        this.boardsService.getBoardById(this.boardId).subscribe(
          (board: Board) => {
            this.boardName = board.name;
            this.fetchColumns();
          },
          (error) => {
            console.error('Error fetching board details:', error);
          }
        );
      }
    });
  }

  openCreateTaskDialog(columnId: number): void {
    const dialogRef = this.dialog.open(CreateEditTaskComponent, {
      data: {boardId: this.boardId, columnId: columnId},
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New task created:', result);
        this.fetchTasksForColumn(columnId); // Refresh tasks for the column where the new task was added
      }
    });
  }

  openCreateColumnDialog(): void {
    const dialogRef = this.dialog.open(CreateEditTaskListComponent, {
      data: {boardId: this.boardId}, // Pass boardId here
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New column created:', result);
        this.fetchColumns(); // Fetch the updated list of columns after creation
      }
    });
  }

  // Add this method for deleting a column
  deleteColumn(columnId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this column and all tasks within it?');
    if (confirmDelete && this.boardId !== undefined) { // Check if boardId is defined
      this.columnService.deleteColumn(this.boardId, columnId).subscribe(
        () => {
          this.columns = this.columns.filter(column => column.id !== columnId);
          console.log(`Column with id ${columnId} deleted.`);
        },
        (error) => {
          console.error('Error deleting column:', error);
        }
      );
    } else {
      console.warn('Board ID is undefined. Cannot delete column.');
    }
  }

  fetchColumns(): void {
    if (this.boardId) {
      this.columnService.getColumnsByBoard(this.boardId).subscribe(
        (columns: Column[]) => {
          this.columns = columns;
          this.connectedTo = this.columns.map(column => column.id.toString()); // Update connectedTo
          this.columns.forEach(column => this.fetchTasksForColumn(column.id)); // Fetch tasks for each column
        },
        (error) => {
          console.error('Error fetching columns:', error);
        }
      );
    }
  }

  fetchTasksForColumn(columnId: number): void {
    if (this.boardId) {
      this.taskService.getTasksByColumnId(this.boardId, columnId).subscribe(
        (tasks: Task[]) => {
          const column = this.columns.find(c => c.id === columnId);
          if (column) {
            column.tasks = tasks; // Assign tasks to the corresponding column
          }
        },
        (error) => {
          console.error('Error fetching tasks for column:', error);
        }
      );
    }
  }

  // Add this method to handle drag and drop
  drop(event: CdkDragDrop<Task[]>): void {
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;

    if (previousContainer === currentContainer) {
      moveItemInArray(this.getTasksForColumn(Number(currentContainer.id)), event.previousIndex, event.currentIndex);
    } else {
      const task = previousContainer.data[event.previousIndex];
      transferArrayItem(previousContainer.data, currentContainer.data, event.previousIndex, event.currentIndex);

      console.log(Number(currentContainer.id))

      // Make sure to update the task's column ID in the backend
      this.taskService.updateTaskColumn(task.id, Number(currentContainer.id), this.boardId!).subscribe(() => {
        console.log('Task updated in new column');
      });
    }
  }

  getTasksForColumn(columnId: number): Task[] {
    const column = this.columns.find(c => c.id === columnId);
    return column ? column.tasks : [];
  }
}
