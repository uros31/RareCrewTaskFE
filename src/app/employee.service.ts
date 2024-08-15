import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeTimeEntry, EmployeeWorkSummary } from './employee-list/employee-list.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';


  constructor(private http: HttpClient) {}

   getEmployees(): Observable<EmployeeWorkSummary[]> {
    var response = this.http.get<EmployeeTimeEntry[]>(this.apiUrl).pipe(
      map((entries) =>
        entries.map((entry) => ({
          name: entry.EmployeeName || 'Without name',
          hoursWorked: this.calculateHoursWorked(entry.StarTimeUtc, entry.EndTimeUtc),
        }))
      )
    );

    return response;
  }
  
  private calculateHoursWorked(startTime: string, endTime: string): number {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = Math.abs(end.getTime() - start.getTime());
    const hoursWorked = diff / (1000 * 60 * 60);
    return isNaN(hoursWorked) ? 0 : hoursWorked;
  }
}
