import { Component, OnInit, Output, EventEmitter, Input, OnChanges, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-game-form',
  templateUrl: './new-game-form.component.html',
  styleUrls: ['./new-game-form.component.scss']
})
export class NewGameFormComponent implements OnInit {

  newGameForm: FormGroup;
  @Input() timeOptions: Array<number>;
  @Input() difficultySet: Array<any>;
  @Output() startGame = new EventEmitter<{time: number, difficulty: string}>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  onStartGame() {
    const time =  this.newGameForm.get('time').value;
    const difficulty =  this.newGameForm.get('difficulty').value;
    const payload = {
      time,
      difficulty,
    };
    this.startGame.emit(payload);
  }

  createForm() {
    this.newGameForm = this.fb.group({
      time: [this.timeOptions[1], Validators.required],
      difficulty: [this.difficultySet[0], Validators.required],
    });
  }

}
