import { Component, signal } from "@angular/core";
import { ButtonComponent } from "../../shared/components/button/button.component";

type TimeFilterValue = "all" | "completed" | "upcoming";

interface TimeFilterOption {
  label: string;
  value: TimeFilterValue;
  ariaLabel: string;
}

/**
 * The Scores consultation Component.
 */
@Component({
  selector: "app-consultation",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./consultation.component.html",
  styleUrl: "./consultation.component.scss",
})
export class ConsultationComponent {
  /**
   * Selected time filter.
   */
  selectedFilter = signal<TimeFilterValue>("all");

  /**
   * Time filter options.
   */
  timeFilterOptions: TimeFilterOption[] = [
    { label: "ALL", value: "all", ariaLabel: "All" },
    { label: "COMPLETED", value: "completed", ariaLabel: "Completed" },
    { label: "UPCOMING", value: "upcoming", ariaLabel: "Upcoming" },
  ];

  /**
   * Handles the click event on a time filter button.
   */
  onTimeFilterClick(filter: TimeFilterValue) {
    this.selectedFilter.set(filter);
  }

  /**
   * Determines if the given filter is selected.
   */
  isSelected = (filter: TimeFilterValue) => this.selectedFilter() === filter;
}
