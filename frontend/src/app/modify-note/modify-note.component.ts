import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from '../services.service';
import {MatDialog} from '@angular/material/dialog';
import { OpenNoteComponent } from '../open-note/open-note.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modify-note',
  templateUrl: './modify-note.component.html',
  styleUrls: ['./modify-note.component.css']
})
export class ModifyNoteComponent implements OnInit{

  @Output() childEvent = new EventEmitter<void>();
  public noteForm!: FormGroup;
  title:string=this.data.title
  note:string=this.data.notebody
  

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private dialog:MatDialog, private formBuilder:FormBuilder, private api:ServicesService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title:['', Validators.required],
      note:['', Validators.required]
    });
  }

  saveChanges(){
    this.api.updateNote({id:this.data.id, title:this.noteForm.value.title, notebody:this.noteForm.value.note}).subscribe(data=>{})
    this.callParentMethod();
    window.location.reload()
  }

  openNote(data:any){
    this.dialog.open(OpenNoteComponent,{
      data:data
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration:1500});
  }

  callParentMethod(): void {
    this.childEvent.emit();
  }
}
