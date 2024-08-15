import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, Color, LabelItem } from 'chart.js';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  displayedColumns: string[] = ['EmployeeName', 'hoursWorked'];
  public chart: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data.reduce((acc: any[], current: any) => {
        const existing = acc.find(item => item.name === current.name);
     
        if (existing) {
          existing.hoursWorked += current.hoursWorked;
        } else {
          acc.push({ name: current.name, hoursWorked: current.hoursWorked });
        }
        return acc;
      }, []);
    
      this.employees.sort((a, b) => b.hoursWorked - a.hoursWorked);

      this.createChart(this.employees);
    });
  }

  createChart(employeeData: any[]){
    debugger;
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: employeeData.map(data => data.name),
        datasets: [{
          label: 'Total Worked Hours',
          data: employeeData.map(data => data.hoursWorked ),
          backgroundColor: [
            'red', 'blue', 'green', 'yellow', 'orange'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}