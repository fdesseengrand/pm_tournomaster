import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule, provideHttpClientTesting } from "@angular/common/http/testing";
import { ScoresComponent } from "./scores.component";

describe("ScoresComponent", () => {
  let component: ScoresComponent;
  let fixture: ComponentFixture<ScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoresComponent, HttpClientTestingModule],
      providers: [provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
