import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Board} from '../models/board.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private url = 'http://localhost:8080/api/boards'

  constructor(private http: HttpClient) {
  }

  getAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.url}`)
  }

  createBoard(newBoard: Omit<Board, 'id'>): Observable<Board> {
    return this.http.post<Board>(`${this.url}`, newBoard);
  }

  deleteBoard(id: number): Observable<Board> {
    return this.http.delete<Board>(`${this.url}/${id}`)
  }

  getBoardById(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.url}/${id}`)
  }
}
