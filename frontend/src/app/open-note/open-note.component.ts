import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from '../services.service';
import { ModifyNoteComponent } from '../modify-note/modify-note.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-open-note',
  templateUrl: './open-note.component.html',
  styleUrls: ['./open-note.component.css']
})

export class OpenNoteComponent {

  @Output() childEvent = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private api:ServicesService, private dialog:MatDialog, private _snackBar: MatSnackBar){}

  deleteNote(noteId:number){
    console.log(`deleted ${noteId}`)
    this.openSnackBar(`${this.data.title} note has been deleted!`, 'Done')
    this.api.deleteNotes(noteId).subscribe(data=>{})
  }

  modifyNote(row:any){
    this.dialog.open(ModifyNoteComponent,{
      data: row
    }).afterClosed().subscribe(res=>{
      this.callParentMethod();
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  callParentMethod(): void {
    this.childEvent.emit();
  }
}