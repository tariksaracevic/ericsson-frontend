import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Task} from '../models/task.intefrace';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = `http://localhost:8080/api/boards`

  constructor(private http: HttpClient) {
  }

  getAllTasks() {
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }

  getTaskById(boardId: number, columnId: number, id: number) {
    return this.http.get<Task>(`${this.baseUrl}/${boardId}/task-lists/${columnId}/tasks/${id}`);
  }

  // getAllOpenTasks() {
  //   return this.http.get<Task>(`${this.baseUrl}/status/1`)
  // }
  //
  // getAllInProgressTasks() {
  //   return this.http.get<Task>(`${this.baseUrl}/status/2`)
  // }
  //
  // getAllDoneTasks() {
  //   return this.http.get<Task>(`${this.baseUrl}/status/3`)
  // }

  getTasksByColumnId(boardId: number, columnId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${boardId}/task-lists/${columnId}/tasks`);
  }

  deleteTask(boardId: number, columnId: number, id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/${boardId}/task-lists/${columnId}/tasks/${id}`)
  }

  createTask(boardId: number, columnId: number, newTask: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/${boardId}/task-lists/${columnId}/tasks`, newTask);
  }

  updateTaskColumn(taskId: number, newColumnId: number, boardId: number): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${boardId}/task-lists/${newColumnId}/tasks/${taskId}`, {});
  }
}
