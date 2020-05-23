import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameEvent } from '../../models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  gameEvents: GameEvent[];

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.list().subscribe(ev => this.gameEvents = ev)

  }

}
