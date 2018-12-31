import { CreateEmployeeComponent } from './create-employee.component';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import {  Injectable } from '@angular/core';

@Injectable()
export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeeComponent>{
    canDeactivate(component: CreateEmployeeComponent): Observable<boolean> | Promise<boolean> | boolean {
        if(component.createEmployeeFrom.dirty){
            return confirm('Are you sure to want to discard your changes?')
        }
        return true;
    }
}