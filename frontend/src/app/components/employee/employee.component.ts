import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  constructor(
    public employeeService: EmployeeService
  ) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employeeService.employees = res;
      },
      err => console.error(err)
    );
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.updateEmployee(form.value).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        res => {
          this.getEmployees();
          form.reset();
        },
        err => console.log(err)
      );
    }
  }

  deleteEmployee(id: string) {
    const res = confirm('Are you sure you want to delete it?');
    if (res) {
      this.employeeService.deleteEmployee(id).subscribe(
        res => {
          this.getEmployees();
        },
        err => console.log(err)
      );
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }
}
