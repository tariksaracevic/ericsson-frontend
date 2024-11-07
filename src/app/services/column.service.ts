import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Column} from '../models/task-list.interface';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  private baseUrl = 'http://localhost:8080/api/boards';

  constructor(private http: HttpClient) {
  }

  createColumn(newColumn: Omit<Column, 'id'>): Observable<Column> {
    return this.http.post<Column>(`${this.baseUrl}/${newColumn.boardId}/task-lists`, newColumn);
  }

  deleteColumn(boardId: number, columnId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${boardId}/task-lists/${columnId}`);
  }

  getColumnsByBoard(boardId: number): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.baseUrl}/${boardId}/task-lists`);
  }
}
