import { Component, OnInit } from '@angular/core';
import{MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RegformComponent } from './regform/regform.component';
import { EmployeeService } from './services/employee.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { response } from 'express';
import { subscribe } from 'diagnostics_channel';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' 
})
export class AppComponent implements OnInit{
   title = 'crudapp';
 employees: any[] = [];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'mobile', 'gender', 'password', 'date','Action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _dialog:MatDialog, 
    private _empservice:EmployeeService){
  }
  ngOnInit(): void {
    this.getemployeelist(); 
  }
  openempform(){
    const dialogRef=this._dialog.open(RegformComponent);  
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getemployeelist();
        }
      },     
    });
  }
  getemployeelist() {
    this._empservice.getemployeelist().subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      },
      error: (error: any) => {
        console.error('Error in getemployeelist:', error);
      }
    })
  }
  editempdata(row:any){
    this._dialog.open(RegformComponent,{
      width:'30%',
      data:row
      }).afterClosed().subscribe(val =>{
        if(val==='update'){
          this.getemployeelist();
        }
      })
  }
  deleteempdata(id: number) {
    this._empservice.deleteempdata(id).subscribe ({
      next: (response) => {
        alert('employee data deleted successfully');
        this.getemployeelist();
      },
      error: (error: any) => {
        alert('Error while deleting data');
      },
    });
   
  }
}







