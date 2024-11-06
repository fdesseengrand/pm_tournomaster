import { HttpClientModule } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CreateMatchDto, Match, UpdateMatchDto } from "../shared/models/match.model";
import { MatchesService } from "./match.service";

describe("MatchesService", () => {
  let service: MatchesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchesService, provideHttpClientTesting()],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MatchesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should retrieve all matches", () => {
    const dummyMatches: Match[] = [
      {
        id: "1",
        score: "1-1",
        dateTime: "2023-01-01T15:00:00.000Z",
        firstTeam: { id: "1", name: "Team A" },
        secondTeam: { id: "2", name: "Team B" },
      },
      {
        id: "2",
        score: "2-2",
        dateTime: "2023-01-02T15:00:00.000Z",
        firstTeam: { id: "3", name: "Team C" },
        secondTeam: { id: "4", name: "Team D" },
      },
    ];

    service.findAll().subscribe((matches: Match[]) => {
      expect(matches.length).toBe(2);
      expect(matches).toEqual(dummyMatches);
    });

    const req = httpMock.expectOne("/matches");
    expect(req.request.method).toBe("GET");
    req.flush(dummyMatches);
  });

  it("should create a new match", () => {
    const newMatch: CreateMatchDto = {
      firstTeam: { id: "1", score: 1 },
      secondTeam: { id: "2", score: 1 },
      dateTime: "2023-01-03T15:00:00.000Z",
    };
    const createdMatch: Match = {
      id: "3",
      score: "1-1",
      dateTime: newMatch.dateTime,
      firstTeam: { id: "1", name: "Team A" },
      secondTeam: { id: "2", name: "Team B" },
    };

    service.create(newMatch).subscribe((match: Match) => {
      expect(match).toEqual(createdMatch);
    });

    const req = httpMock.expectOne("/matches");
    expect(req.request.method).toBe("POST");
    req.flush(createdMatch);
  });

  it("should update an existing match", () => {
    const updateData: UpdateMatchDto = {
      id: "1",
      firstTeam: { id: "1", score: 2 },
      secondTeam: { id: "2", score: 2 },
      dateTime: "2023-01-01T15:00:00.000Z",
    };
    const updatedMatch: Match = {
      id: "1",
      score: "2-2",
      dateTime: updateData.dateTime,
      firstTeam: { id: "1", name: "Team A" },
      secondTeam: { id: "2", name: "Team B" },
    };

    service.update("1", updateData).subscribe((match: Match) => {
      expect(match).toEqual(updatedMatch);
    });

    const req = httpMock.expectOne("/matches/1");
    expect(req.request.method).toBe("PATCH");
    req.flush(updatedMatch);
  });
});
