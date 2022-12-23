export type DateInfo = [ number, number, number? ]

export interface DateMsg {
  year: number;
  month: number;
}

export interface DateDOMPool {
  weekdays: HTMLElement | null;
  controlArea: HTMLElement | null;
}

export interface YearDOMPool {
  controlArea: HTMLElement | null;
}

export interface MonthDOMPool {
  controlArea: HTMLElement | null;
  monthNode: HTMLElement[] | null;
}

export interface TableDOMPool {
  table: HTMLElement | null;
}

export enum ALLOWED_FLAGS {
  YEAR = 'year',
  MONTH = 'month',
  DATE = 'date'
}

export type CalendarOptions = [ string, DateInfo, (...args: any[]) => any ] | [ string, (...args: any[]) => any ]
