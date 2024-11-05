import { Component } from "@angular/core";
import { ButtonComponent } from "../../shared/components/button/button.component";

/**
 * The Scores consultation Component.
 */
@Component({
  selector: "app-consultation",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./consultation.component.html",
  styleUrl: "./consultation.component.scss",
})
export class ConsultationComponent {
  /**
   * Handles the click event on a time filter button.
   */
  onTimeFilterClick() {
    throw new Error("Method not implemented.");
  }
}
