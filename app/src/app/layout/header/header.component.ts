import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../shared/auth/auth.service";
import { APP_ROUTES } from "../../shared/constants/routes.constants";

/**
 * The header component.
 */
@Component({
  selector: "app-header",
  standalone: true,
  imports: [AsyncPipe, NgClass, NgIf, RouterLink, RouterLinkActive],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  public APP_ROUTES = APP_ROUTES;

  constructor(public authService: AuthService) {}

  onLogClick(event: MouseEvent, isAuthenticated: boolean | null): void {
    if (isAuthenticated) {
      event.preventDefault();
      this.authService.logout();
    }
  }
}
