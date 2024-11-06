import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateTeamDto, Team } from "../shared/models/team.model";

/**
 * The Team service.
 */
@Injectable({
  providedIn: "root",
})
export class TeamService {
  private readonly API_URL = "teams";

  /**
   * Constructor.
   * @param http The HTTP client.
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetches all teams from the server.
   */
  findAll(): Observable<Team[]> {
    return this.http.get<Team[]>(this.API_URL);
  }

  /**
   * Creates a new team.
   * @param teamData The data for the team to create.
   */
  create(teamData: CreateTeamDto): Observable<Team> {
    return this.http.post<Team>(this.API_URL, teamData);
  }
}
