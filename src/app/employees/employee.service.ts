import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
// import { of, Observable} from 'rxjs';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx'
import { throwError } from "rxjs";

import {catchError,map, retry} from 'rxjs/operators';
// import { delay } from 'rxjs/internal/operators';
// import { Observable } from "rxjs/Observable";
// import { of } from "rxjs/observable/of";
// import { delay } from "rxjs/operators";
// import 'rxjs/add/operator/catch';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // private listEmployees : Employee[] = [
  //   {
  //     id: 1,
  //     name: 'Rodger',
  //     gender: 'Male',
  //     email: 'rodger@gmail.com',
  //     phoneNumber: +1234567,
  //     contactPreference:'Email',
  //     dateOfBirth: new Date('10/25/1983'),
  //     department: '3',
  //     isActive: true,
  //     photoPath: 'assets/images/rodger.jpg',
  //     password:'1234',
  //     confirmPassword:'1234'
  //   },
  //   {
  //     id: 2,
  //     name: 'Zeuce',
  //     gender: 'Female',
  //     email: 'zeuce@gmail.com',
  //     phoneNumber: +1234567,
  //     contactPreference:'Phone',
  //     dateOfBirth: new Date('10/25/1999'),
  //     department: '2',
  //     isActive: true,
  //     photoPath: 'assets/images/zeuce.jpg',
  //     password:'1234',
  //     confirmPassword:'1234'
  //   },
  //   {
  //     id: 3,
  //     name: 'yamin',
  //     gender: 'Male',
  //     email: 'yamin@gmail.com',
  //     phoneNumber: +1234567,
  //     contactPreference:'Phone',
  //     dateOfBirth: new Date('10/25/1992'),
  //     department: '2',
  //     isActive: true,
  //     photoPath: 'assets/images/yamin.jpg',
  //     password:'1234',
  //     confirmPassword:'1234'
  //   }
  // ];

  baseUrl = 'http://localhost:3000/employees';
  constructor(private _httpClient : HttpClient) { }
 
  getEmployees(): Observable<Employee[]>{
    // return of(this.listEmployees).pipe(delay(2000));
    return this._httpClient.get<Employee[]>(this.baseUrl).pipe(catchError(this.handleError));
  }
  private handleError(errorResponse : HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
      console.log('Client Side Error : ', errorResponse.error.message)
    }else{
      console.log('Server Side Error : ', errorResponse);
    }
    return  Observable.throw('There is a problem with the service . Wer are notified & working on it. Please try again later');
  }

  // getEmployee(id:number): Employee{
  //   return this.listEmployees.find(e=> e.id === id);
  // }

  getEmployee(id:number):Observable<Employee>{
    return this._httpClient.get<Employee>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }



  // save(employee:Employee){
  //   if(employee.id === null){
  //     const maxId = this.listEmployees.reduce(function(e1,e2){
  //       return (e1.id > e2.id) ? e1 : e2;
  //     }).id;
  //     employee.id = maxId + 1;
  //     this.listEmployees.push(employee)
  //   }else{
  //     const foundIndex = this.listEmployees.findIndex(e=>e.id === employee.id);
  //     this.listEmployees[foundIndex] = employee;
  //   }
  // }

  // deleteEmployee(id:number){
  //   const i = this.listEmployees.findIndex(e=>e.id === id);
  //   if(i !== -1){
  //     this.listEmployees.splice(i, 1);
  //   }
  // }

  addEmployee(employee: Employee) : Observable<Employee>{

      return this._httpClient.post<Employee>(this.baseUrl, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
        
      }).pipe(catchError(this.handleError));
    
  }

  updateEmployee(employee: Employee) : Observable<void>{

      return this._httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
        
      }).pipe(catchError(this.handleError));
    
  }

    deleteEmployee(id:number) : Observable<void>{
      return this._httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }
}
 