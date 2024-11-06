import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TeamsAdminComponent } from "./teams-admin.component";

describe("CreateTeamComponent", () => {
  let component: TeamsAdminComponent;
  let fixture: ComponentFixture<TeamsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
