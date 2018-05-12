import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestResultsBoardComponent } from './best-results-board.component';

describe('BestResultsBoardComponent', () => {
  let component: BestResultsBoardComponent;
  let fixture: ComponentFixture<BestResultsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestResultsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestResultsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
