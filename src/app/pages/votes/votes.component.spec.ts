import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesPage } from './votes.component';

describe('VotesComponent', () => {
  let component: VotesPage;
  let fixture: ComponentFixture<VotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
