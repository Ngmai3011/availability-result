export const daysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type Calendar = Record<string, string[]>;

export const calendar: Calendar = {
  Week1: daysInWeek,
  Week2: daysInWeek,
  Week3: daysInWeek,
  Week4: daysInWeek,
  Week5: daysInWeek,
  Week6: daysInWeek,
  Week7: daysInWeek,
};

export interface Data {
  onDataAdded: (data: Calendar) => void;
}

export interface DataTable {
  week: string;
  data: Calendar;
}
