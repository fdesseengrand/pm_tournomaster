import { AsyncPipe, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { AuthService } from "../../shared/auth/auth.service";

/**
 * Header component.
 */
@Component({
  selector: "app-header",
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  /**
   * Constructor.
   * @param authService The authentication service.
   */
  constructor(public authService: AuthService) {}
}
