import { Pipe, PipeTransform } from "@angular/core";
import { format } from "date-fns";

/**
 * Pipe to display the status of a date.
 */
@Pipe({
  name: "dateStatus",
  standalone: true,
})
export class DateStatusPipe implements PipeTransform {
  transform(dateTime: string): string {
    if (!dateTime) {
      return "";
    }

    const date = new Date(dateTime);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      // Today: hour ('15h00')
      return format(date, "HH'h'mm");
    } else if (date < now) {
      // Past
      return "COMPLETED";
    } else {
      // Future: date and hour ('10/11')
      return format(date, "dd/MM");
    }
  }
}
