import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModal } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj?: EmployeeModal = new EmployeeModal()
  employeeList: EmployeeModal[] = []

  constructor(){
    this.createForm()
    const oldData = localStorage.getItem("EmpData")
    if(oldData != null){
      const parseData = JSON.parse(oldData)
      this.employeeList = parseData
    }
  }

  createForm(){
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj?.empId),
      name: new FormControl(this.employeeObj?.name, [Validators.required]),
      city: new FormControl(this.employeeObj?.city),
      state: new FormControl(this.employeeObj?.state),
      emailId: new FormControl(this.employeeObj?.emailId),
      contactNo: new FormControl(this.employeeObj?.contactNo),
      address: new FormControl(this.employeeObj?.address),
      pinCode: new FormControl(this.employeeObj?.pinCode, [Validators.required, Validators.minLength(6)]),
    })
  }

  onSave(){
    const oldData = localStorage.getItem("EmpData")
    if(oldData != null){
      const parseData = JSON.parse(oldData)
      this.employeeForm.controls['empId'].setValue(parseData.length + 1)
      this.employeeList.unshift(this.employeeForm.value)
    } else {
      this.employeeList.unshift(this.employeeForm.value)
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
    this.employeeObj = new EmployeeModal()
    this.createForm()
  }

  onEdit(item: EmployeeModal){
    this.employeeObj = item
    this.createForm()
  }
  onDelete(id: number){
      const isDelete = confirm("Are you sure want to Delete ?")
      if(isDelete){
        const index = this.employeeList.findIndex((m=> m.empId == id))
        this.employeeList.splice(index, 1)
        localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
      }
      
    }
  onUpdate(){
    const record = this.employeeList.find((m=> m.empId == this.employeeForm.controls["empId"].value))
    if(record != undefined){
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
    this.employeeObj = new EmployeeModal()
    this.createForm()
  }

  onReset(){
    this.employeeObj = new EmployeeModal()
    this.createForm()
  }




}
