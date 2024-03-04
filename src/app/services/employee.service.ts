import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  deleteemployeeByID(id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private _http: HttpClient) { }

  addEmployee(employeeData: any): Observable<any> {
     return this._http.post('http://localhost:3000/employees', employeeData);
   
  }
  getemployeelist(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
 
  }
  deleteempdata(id:number):Observable<any>{
    return this._http.delete('http://localhost:3000/employees/'+id);
  }
  putempdata(data:any,id:number):Observable<any>{
    return this._http.put('http://localhost:3000/employees/'+id , data);
  }
 
}
