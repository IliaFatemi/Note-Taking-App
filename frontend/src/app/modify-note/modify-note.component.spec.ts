import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNoteComponent } from './modify-note.component';

describe('ModifyNoteComponent', () => {
  let component: ModifyNoteComponent;
  let fixture: ComponentFixture<ModifyNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
