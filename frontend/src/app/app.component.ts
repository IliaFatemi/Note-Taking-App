import { Component, OnInit, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';
import { OpenNoteComponent } from './open-note/open-note.component';
import { ServicesService } from './services.service';
import { DataService } from './data.service';
import { ModifyNoteComponent } from './modify-note/modify-note.component';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Notes {
  id: number;
  title: string;
  notebody: string;
  timelastmodified: string;
  createdon:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Notes';
  notes: Notes[] = [];
  displayedColumns: string[] = ['Title', 'Date Created', 'Date Modified', 'Tools'];
  dataSource = this.notes;
  clickedRows = new Set<Notes>();
  constructor(private dialog:MatDialog, private api:ServicesService, private dataService: DataService, private _snackBar: MatSnackBar){
    this.api.create_table().subscribe(data=>{console.log(data)})
    this.showNotes()
  }
  
  ngOnInit(): void {
    this.showNotes()
  }

  openNote(row:any){
    this.dialog.open(OpenNoteComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(data=>{
      this.showNotes()
    })
  }

  showNotes(){
    this.api.getNotes().subscribe(async data=>{
      this.notes = await JSON.parse(JSON.stringify(data))
      this.dataSource = await JSON.parse(JSON.stringify(data))
    })
  }

  modifyNotes(data:any){
    this.showNotes()
    this.dialog.open(ModifyNoteComponent,{
      data:data
    }).afterClosed().subscribe(data=>{
      this.showNotes()
    })
  }

  deleteNote(noteId:number, title:string){
    this.api.deleteNotes(noteId).subscribe()
    this.showNotes()
    window.location.reload()
  }

  openDialog(): void {
    this.dialog.open(AddNoteDialogComponent, {}).afterClosed().subscribe(data=>{
      this.showNotes()
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration:1500});
  }

  parentUpdate(): void {
    console.log('updating Notes')
    this.showNotes()
  }

  childEvent = new EventEmitter<void>();
}
