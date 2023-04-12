import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenNoteComponent } from './open-note.component';

describe('OpenNoteComponent', () => {
  let component: OpenNoteComponent;
  let fixture: ComponentFixture<OpenNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
