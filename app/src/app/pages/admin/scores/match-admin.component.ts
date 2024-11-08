import { AsyncPipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { forkJoin, Observable, of } from "rxjs";
import { MatchService } from "../../../services/match.service";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { Match } from "../../../shared/models/match.model";
import { bothOrNeitherDefinedValidator } from "../../../shared/utils/match.utils";
import { MatchUpdateComponent } from "./match-update/match-update.component";

/**
 * The results page.
 */
@Component({
  selector: "app-match-admin",
  standalone: true,
  imports: [ButtonComponent, AsyncPipe, MatchUpdateComponent, ReactiveFormsModule],
  templateUrl: "./match-admin.component.html",
  styleUrl: "./match-admin.component.scss",
})
export class MatchAdminComponent {
  matches = signal<Match[]>([]);

  matchesForm!: FormGroup;

  errorMessage = signal("");

  validationMessage = signal("");

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
        scoreTeam1: [match.score?.split("-")[0] || "", [Validators.pattern(/^\d+$/)]],
        scoreTeam2: [match.score?.split("-")[1] || "", [Validators.pattern(/^\d+$/)]],
      }, { validators: bothOrNeitherDefinedValidator('scoreTeam1', 'scoreTeam2') });
      this.matchesForm.addControl(match.id, matchForm);
    });
  }

  onSubmit(): void {
    this.errorMessage.set("");
    this.validationMessage.set("");
    if (this.matchesForm.valid) {
      const updateObservables = this.matches()
        .filter((match) => this.matchesForm.get(match.id)?.valid && this.matchesForm.get(match.id)?.dirty)
        .map((match) => this.updateMatch(match));

      // Wait for all updates to finish.
      if (updateObservables.length > 0) {
        forkJoin(updateObservables).subscribe({
          next: () => {
            this.validationMessage.set("The new scores have been saved!");
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
      let updatedScore = "";
      if (form.value.scoreTeam1 && form.value.scoreTeam2) {
        updatedScore = `${form.value.scoreTeam1}-${form.value.scoreTeam2}`;
      }
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
