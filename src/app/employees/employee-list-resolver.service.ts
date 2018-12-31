import { of } from 'rxjs/observable/of';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx'
import { ResolvedEmployeeList } from './resolve-employeelist.model';
import { EmployeeService } from './employee.service';
import {  throwError } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../models/employee.model';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeListResolverService implements Resolve<ResolvedEmployeeList> {
    constructor(private _employeeService : EmployeeService){}
    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<ResolvedEmployeeList>{
        return this._employeeService.getEmployees().pipe(
            map((employeeList )=> new ResolvedEmployeeList(employeeList)),
            catchError((err:any) => Observable.of(new ResolvedEmployeeList(null, err)))
        )
        
    }

}