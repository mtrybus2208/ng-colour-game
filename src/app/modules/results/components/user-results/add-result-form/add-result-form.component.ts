import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-result-form',
  templateUrl: './add-result-form.component.html',
  styleUrls: ['./add-result-form.component.scss']
})
export class AddResultFormComponent implements OnInit {

  addResultForm: FormGroup;
  @Input() isTopScore: boolean;
  @Input() loading: boolean;
  @Output() sendResult = new EventEmitter<string>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  onSendResult() {
    this.sendResult.emit(this.nickname.value);
  }

  createForm() {
    this.addResultForm = this.fb.group({
      nickname: ['', Validators.required],
    });
  }

  get nickname() { return this.addResultForm.get('nickname'); }

}
