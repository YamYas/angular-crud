import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeService } from './employee.service';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate {
    constructor(private _employeeService: EmployeeService, private _router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // const employeeExists = !!this._employeeService.getEmployee(+route.paramMap.get('id'));
        // if(employeeExists){
        //     return true
        // }else{
        //     this._router.navigate(['notFound'])
        //     return false;
        // }


         return this._employeeService.getEmployee(+route.paramMap.get('id')).pipe(
            map(employee=>{
                const employeeExists = !! employee;
                if(employeeExists){
                    return true;
                }else{
                    this._router.navigate(['notFound']);
                    return false;
                }
            }),
            catchError((err)=>{
                console.log(err);
                return Observable.of(false);
            })
                
            

        )
    }
}