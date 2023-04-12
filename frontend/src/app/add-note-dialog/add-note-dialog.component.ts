import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.css']
})
export class AddNoteDialogComponent implements OnInit {

  @Output() childEvent = new EventEmitter<void>();
  public noteForm!: FormGroup;
  title:string=""
  note:string=""

  constructor(private formBuilder:FormBuilder, 
    private _snackBar: MatSnackBar, 
    private api:ServicesService){}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title:['', Validators.required],
      note:['', Validators.required]
    });
  }

  addNote():void{
    if(this.noteForm.value.title == "" || this.noteForm.value.note == ""){
      console.log("Empty Fields Detected")
    }else{
      this.api.addNote({title:this.noteForm.value.title, notebody:this.noteForm.value.note}).subscribe(data=>{})
      this.callParentMethod()
      window.location.reload()
    }
  }

  callParentMethod(): void {
    this.childEvent.emit();
  }

}
