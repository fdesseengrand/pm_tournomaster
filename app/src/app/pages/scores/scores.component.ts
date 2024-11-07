import { AsyncPipe } from "@angular/common";
import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { MAtchWebSocketService as MatchWebSocketService } from "../../services/match-websocket.service";
import { MatchService } from "../../services/match.service";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { Match } from "../../shared/models/match.model";
import { DateStatusPipe } from "../../shared/pipes/date-status.pipe";

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
export class ScoresComponent implements OnInit, OnDestroy {
  private matchesSubject = new BehaviorSubject<Match[]>([]);
  matches$: Observable<Match[]> = this.matchesSubject.asObservable();

  filteredMatches$!: Observable<Match[]>;

  selectedFilter = signal<TimeFilterValue>("all");

  errorMessage = signal("");

  timeFilterOptions: TimeFilterOption[] = [
    { label: "ALL", value: "all", ariaLabel: "All" },
    { label: "COMPLETED", value: "completed", ariaLabel: "Completed" },
    { label: "UPCOMING", value: "upcoming", ariaLabel: "Upcoming" },
  ];

  constructor(private matchesService: MatchService, private webSocketService: MatchWebSocketService) { }

  ngOnInit(): void {
    this.loadMatches();

    this.webSocketService.onMatchUpdate(() => {
      this.loadMatches();
    });

    // Apply filter based on selected filter and matches data
    this.filteredMatches$ = this.matches$.pipe(map((matches) => {
      return matches.filter(this.filterByTime.bind(this))
    }));
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  private loadMatches(): void {
    this.matchesService.findAll().subscribe({
      next: (matches) => {
        this.matchesSubject.next(matches);
      },
      error: () => this.errorMessage.set("An error occured while loading matches"),
    });
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
    this.filteredMatches$ = this.matches$.pipe(map((matches) => matches.filter(this.filterByTime.bind(this))));
  }

  isSelected = (filter: TimeFilterValue) => this.selectedFilter() === filter;
}
