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
  templateUrl: "./teams-admin.component.html",
  styleUrl: "./teams-admin.component.scss",
})
export class TeamsAdminComponent {
  teams = signal<Team[]>([]);

  errorMessage = signal("");

  teamName = "";

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  private fetchTeams(): void {
    this.teamService.findAll().subscribe({
      next: (teams) => this.teams.set(teams),
      error: () => this.errorMessage.set("Failed to load teams"),
    });
  }

  createTeam(): void {
    if (!this.teamName) {
      this.errorMessage.set("Please enter a team name");
    }

    this.teamService.create({ name: this.teamName }).subscribe({
      next: () => {
        this.errorMessage.set("");
        this.fetchTeams();
        this.teamName = "";
      },
      error: () => this.errorMessage.set("Failed to create team"),
    });
  }

  onCancelClick(): void {
    this.teamName = "";
  }
}
