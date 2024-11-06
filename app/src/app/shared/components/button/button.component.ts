import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

/**
 * Generic button component.
 */
@Component({
  selector: "app-button",
  standalone: true,
  imports: [NgClass],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
})
export class ButtonComponent {
  /**
   * The button mode.
   */
  @Input() mode: "primary" | "secondary" = "primary";

  /**
   * The button type
   */
  @Input() type?: string = "button";

  /**
   * Indicates if the button is disabled.
   */
  @Input() isDisabled?: boolean | null = false;

  /**
   * Click output event.
   */
  @Output() clicked = new EventEmitter<Event>();

  /**
   * Emit the event when the button is clicked.
   * @param event The event.
   */
  onClick(event: Event): void {
    this.clicked.emit(event);
  }
}
