import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { ScoresComponent } from "./pages/scores/scores.component";
import { authGuard } from "./shared/auth/auth.guard";
import { APP_ROUTES } from "./shared/constants/routes.constants";

/**
 * Main routes of the application.
 */
export const routes: Routes = [
  { path: "", redirectTo: APP_ROUTES.scores, pathMatch: "full" },
  { path: APP_ROUTES.login, component: LoginComponent },
  { path: APP_ROUTES.scores, component: ScoresComponent },
  {
    path: "admin",
    loadChildren: () => import("./pages/admin/admin.routes"),
    canActivate: [authGuard],
  },
  { path: "**", redirectTo: APP_ROUTES.scores },
];
