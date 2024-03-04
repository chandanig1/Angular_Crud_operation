import { OnInit, inject,Injectable } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef} from '@angular/cdk/dialog';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { response } from 'express';


@Component({
  selector: 'app-regform',
  templateUrl: './regform.component.html',
  styleUrl: './regform.component.css', 
})
export class RegformComponent{
  myForm: FormGroup;
  Actionbtn: string = "save";

  constructor(@Inject(MAT_DIALOG_DATA) public editdata: any,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef:MatDialogRef<RegformComponent>,  
    
  ) {
    this.myForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      gender: '',
      password: '',
      date: '',
    
    });
    if(this.editdata){
      this.Actionbtn="update";
      this.myForm.controls['firstname'].setValue(this.editdata.firstname);
      this.myForm.controls['lastname'].setValue(this.editdata.lastname);
      this.myForm.controls['email'].setValue(this.editdata.email);
      this.myForm.controls['mobile'].setValue(this.editdata.mobile);
      this.myForm.controls['gender'].setValue(this.editdata.gender);
      this.myForm.controls['password'].setValue(this.editdata.password);
      this.myForm.controls['date'].setValue(this.editdata.date);
    }
    
  }
  onFormSubmit() {
    if(!this.editdata){
    if (this.myForm.valid) {
      this.employeeService.addEmployee(this.myForm.value).subscribe({
        next: (response: any) => {
          console.log(response); 
          alert('Employee added successfully');
          this.dialogRef.close(true); 
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }else
  {
    this.updatedata();
  }
  }
  updatedata(){
    this.employeeService.putempdata(this.myForm.value,this.editdata.id).subscribe({
      next:(response) =>
      {
        alert('employee data updated successfully');
        this.myForm.reset();
        this.dialogRef.close('update');
      },
      error:() =>{
        alert('error while updating the record');
      }
    })
  }
}
