import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user'
import { LogService } from '../services/log.service'
import { catchError, map, tap } from 'rxjs/operators';
import { GameEvent } from '../models/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private getUrl = "https://localhost:8000/events/";
  private listUrl = "https://localhost:8000/events/all";
  private postUrl = "https://localhost:8000/events/";
  private updateUrl = "https://localhost:8000/events/";
  private deleteUrl = "https://localhost:8000/events/";

  private httpOptions ={
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }

  list(): Observable<GameEvent[]> {
    return this.http.get<GameEvent[]>(this.listUrl, this.httpOptions)
    .pipe(
      tap(_ => this.logService.log('List Events')),
      catchError(this.logService.handleError<GameEvent[]>('list', []))
    );
  }
}
