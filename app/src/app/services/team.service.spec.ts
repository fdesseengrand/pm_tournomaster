import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CreateTeamDto, Team } from "../shared/models/team.model";
import { TeamService } from "./team.service";

describe("TeamService", () => {
  let service: TeamService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamService, provideHttpClientTesting()],
    });
    service = TestBed.inject(TeamService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe("#getAllTeams", () => {
    it("should fetch all teams (GET request)", () => {
      const mockTeams: Team[] = [
        { id: "1", name: "Team A" },
        { id: "2", name: "Team B" },
      ];

      service.getAllTeams().subscribe((teams) => {
        expect(teams).toEqual(mockTeams);
      });

      const req = httpMock.expectOne("/teams");
      expect(req.request.method).toBe("GET");
      req.flush(mockTeams);
    });
  });

  describe("#createTeam", () => {
    it("should create a new team (POST request)", () => {
      const newTeam: CreateTeamDto = { name: "Team C" };
      const createdTeam: Team = { id: "3", name: "Team C" };

      service.createTeam(newTeam).subscribe((team) => {
        expect(team).toEqual(createdTeam);
      });

      const req = httpMock.expectOne("/teams");
      expect(req.request.method).toBe("POST");
      expect(req.request.body).toEqual(newTeam);
      req.flush(createdTeam);
    });
  });
});
