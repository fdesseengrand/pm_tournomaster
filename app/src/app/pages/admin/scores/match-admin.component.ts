import { AsyncPipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { forkJoin, Observable, of } from "rxjs";
import { MatchService } from "../../../services/match.service";
import { Match } from "../../../shared/models/match.model";
import { MatchUpdateComponent } from "./match-update/match-update.component";

/**
 * The results page.
 */
@Component({
  selector: "app-match-admin",
  standalone: true,
  imports: [AsyncPipe, MatchUpdateComponent, ReactiveFormsModule],
  templateUrl: "./match-admin.component.html",
  styleUrl: "./match-admin.component.scss",
})
export class MatchAdminComponent {
  matches = signal<Match[]>([]);

  matchesForm!: FormGroup;

  errorMessage = signal("");

  constructor(public matchService: MatchService, public fb: FormBuilder) {
    this.matchesForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.fetchMatches();
  }

  private fetchMatches(): void {
    this.matchService.findAll().subscribe({
      next: (matches) => {
        this.initializeForm(matches);
        this.matches.set(matches);
      },
      error: () => this.errorMessage.set("Failed to load matches"),
    });
  }

  private initializeForm(matches: Match[]): void {
    // Recreates the form group.
    this.matchesForm = this.fb.group({});
    // Create a sub-FormGroup for each match and add it to the matchesForm.
    matches.forEach((match) => {
      const matchForm = this.fb.group({
        scoreTeam1: [match.score?.split("-")[0] || "", [Validators.required, Validators.pattern(/^\d+$/)]],
        scoreTeam2: [match.score?.split("-")[1] || "", [Validators.required, Validators.pattern(/^\d+$/)]],
      });
      this.matchesForm.addControl(match.id, matchForm);
    });
  }

  onCancel(): void {
    this.errorMessage.set("");
    this.matchesForm.reset();
  }

  onSubmit(): void {
    this.errorMessage.set("");
    if (this.matchesForm.valid) {
      const updateObservables = this.matches()
        .filter((match) => this.matchesForm.get(match.id)?.valid && this.matchesForm.get(match.id)?.dirty)
        .map((match) => this.updateMatch(match));

      // Wait for all updates to finish.
      if (updateObservables.length > 0) {
        forkJoin(updateObservables).subscribe({
          next: () => {
            // Refetch the data once all updates are done.
            this.fetchMatches();
          },
          error: () => this.errorMessage.set("Failed to update matches"),
        });
      }
    } else {
      this.errorMessage.set("Please fill in all the required fields");
    }
  }

  updateMatch(match: Match): Observable<Match> {
    const form = this.matchesForm.get(match.id);
    if (form?.valid) {
      const updatedScore = `${form.value.scoreTeam1}-${form.value.scoreTeam2}`;
      const updatedMatch = { ...match, score: updatedScore };

      // Return the observable so it can be part of the forkJoin
      return this.matchService.update(updatedMatch);
    } else {
      this.errorMessage.set("An error occurred while updating the match");
      return of();
    }
  }

  getMatchFormGroup(match: Match): FormGroup {
    return this.matchesForm.get(match.id) as FormGroup;
  }
}
