import { AsyncPipe } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { map, Observable } from "rxjs";
import { DateStatusPipe } from "../../pipes/date-status.pipe";
import { MatchesService } from "../../services/match.service";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { Match } from "../../shared/models/match.model";

type TimeFilterValue = "all" | "completed" | "upcoming";

interface TimeFilterOption {
  label: string;
  value: TimeFilterValue;
  ariaLabel: string;
}

/**
 * The scores consultation page.
 */
@Component({
  selector: "app-scores",
  standalone: true,
  imports: [AsyncPipe, ButtonComponent, DateStatusPipe],
  templateUrl: "./scores.component.html",
  styleUrl: "./scores.component.scss",
})
export class ConsultationComponent implements OnInit {
  matches$!: Observable<Match[]>;

  filteredMatches$!: Observable<Match[]>;

  selectedFilter = signal<TimeFilterValue>("all");

  timeFilterOptions: TimeFilterOption[] = [
    { label: "ALL", value: "all", ariaLabel: "All" },
    { label: "COMPLETED", value: "completed", ariaLabel: "Completed" },
    { label: "UPCOMING", value: "upcoming", ariaLabel: "Upcoming" },
  ];

  constructor(private matchesService: MatchesService) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches(): void {
    this.matches$ = this.matchesService.findAll();
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredMatches$ = this.matches$.pipe(
      map((matches) => {
        return matches.filter(this.filterByTime.bind(this));
      })
    );
  }

  /**
   * Filters the matches based on the selected time filter.
   * @param match The match to filter.
   * @returns True if the match should be included in the filtered list.
   */
  filterByTime(match: Match): boolean {
    const currentDate = new Date();
    const matchDate = new Date(match.dateTime);

    // Determine if the match is upcoming or completed
    const isCompleted = matchDate < currentDate;
    const isUpcoming = matchDate >= currentDate;

    // Filter based on the selected filter
    switch (this.selectedFilter()) {
      case "completed":
        return isCompleted;
      case "upcoming":
        return isUpcoming;
      default:
        // Return all matches for 'all' filter
        return true;
    }
  }

  onTimeFilterClick(filter: TimeFilterValue) {
    this.selectedFilter.set(filter);
    this.applyFilter();
  }

  isSelected = (filter: TimeFilterValue) => this.selectedFilter() === filter;
}
