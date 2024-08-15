export interface EmployeeTimeEntry {
    Id: string;
    EmployeeName: string;
    StarTimeUtc: string;  // The typo in "StarTimeUtc" is preserved if it's part of the API response
    EndTimeUtc: string;
    EntryNotes: string;
    DeletedOn: string | null;
  }

  export interface EmployeeWorkSummary {
    name: string;
    hoursWorked: number;
  }