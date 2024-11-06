import { AsyncPipe, NgClass } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TeamService } from "../../../services/team.service";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { Team } from "../../../shared/models/team.model";

/**
 * The teams management page.
 */
@Component({
  selector: "app-team",
  standalone: true,
  imports: [AsyncPipe, ButtonComponent, NgClass, FormsModule],
  templateUrl: "./teams.component.html",
  styleUrl: "./teams.component.scss",
})
export class TeamsComponent {
  teams = signal<Team[]>([]);

  teamName: string = "";

  errorMessage: string = "";

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  private fetchTeams(): void {
    this.teamService.getAllTeams().subscribe({
      next: (teams) => {
        this.teams.set(teams);
      },
      error: () => {
        this.errorMessage = "Failed to load teams";
      },
    });
  }

  createTeam() {
    if (!this.teamName) {
      return;
    }

    this.teamService.createTeam({ name: this.teamName }).subscribe({
      next: () => {
        this.fetchTeams();
        this.teamName = "";
      },
      error: (err) => {
        this.errorMessage = "Failed to create team";
      },
    });
  }

  onCancelClick() {
    this.teamName = "";
  }
}
