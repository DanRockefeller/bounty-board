import { Component, OnInit, Input } from '@angular/core';
import { GameEvent } from 'src/app/models/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() gameEvent: GameEvent;
  title: string;
  description = "This is a Description";

  constructor() { }

  ngOnInit(): void {
  }
}
