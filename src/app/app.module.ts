import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';
import { AccordionComponent } from './shared/accordion/accordion.component';

const appRoutes: Routes = [
{path: 'list', component:ListEmployeesComponent, resolve: {employeeList:EmployeeListResolverService}},
{path: 'create', component:CreateEmployeeComponent, canDeactivate:[CreateEmployeeCanDeactivateGuardService]},
{path: 'edit/:id', component:CreateEmployeeComponent, canDeactivate:[CreateEmployeeCanDeactivateGuardService]},
{path: 'employees/:id', component:EmployeeDetailsComponent, canActivate:[EmployeeDetailsGuardService]},
{path: '', redirectTo:'/list', pathMatch:'full'},
{path: 'notFound', component:PageNotFoundComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
    // RouterModule.forRoot(appRoutes, {enableTracing:true})
  ],
  providers: [EmployeeService,CreateEmployeeCanDeactivateGuardService, EmployeeListResolverService, EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
