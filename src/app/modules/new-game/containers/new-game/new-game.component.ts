import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('NewGameComponent');
  }
}
