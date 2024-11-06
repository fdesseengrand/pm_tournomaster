import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateMatchDto, Match, UpdateMatchDto } from "../shared/models/match.model";

/**
 * The Matches service.
 */
@Injectable({
  providedIn: "root",
})
export class MatchesService {
  private readonly API_URL = "matches";

  /**
   * Constructor.
   * @param http The HTTP client.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of all matches.
   */
  findAll(): Observable<Match[]> {
    return this.http.get<Match[]>(this.API_URL);
  }

  /**
   * Creates a new match.
   * @param matchData The data for the match to create.
   */
  create(matchData: CreateMatchDto): Observable<Match> {
    return this.http.post<Match>(this.API_URL, matchData);
  }

  /**
   * Updates an existing match.
   * @param id The ID of the match to update.
   * @param updateData The new data for the match.
   */
  update(id: string, updateData: UpdateMatchDto): Observable<Match> {
    return this.http.patch<Match>(`${this.API_URL}/${id}`, updateData);
  }
}
