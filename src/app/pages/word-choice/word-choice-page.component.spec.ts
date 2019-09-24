import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordChoicePageComponent } from './word-choice-page.component';

describe('WordChoicePageComponent', () => {
  let component: WordChoicePageComponent;
  let fixture: ComponentFixture<WordChoicePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordChoicePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordChoicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
