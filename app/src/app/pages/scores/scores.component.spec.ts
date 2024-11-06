import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule, provideHttpClientTesting } from "@angular/common/http/testing";
import { ConsultationComponent } from "./scores.component";

describe("ConsultationComponent", () => {
  let component: ConsultationComponent;
  let fixture: ComponentFixture<ConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationComponent, HttpClientTestingModule],
      providers: [provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
