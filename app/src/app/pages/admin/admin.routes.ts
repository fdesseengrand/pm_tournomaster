import { Routes } from "@angular/router";
import { authGuard } from "../../shared/auth/auth.guard";
import { SetResultsComponent } from "./scores/set-scores.component";
import { TeamsComponent } from "./teams/teams.component";

/**
 * Admin routes.
 */
const adminRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "teams",
  },
  {
    path: "teams",
    component: TeamsComponent,
    canActivate: [authGuard],
  },
  {
    path: "results",
    component: SetResultsComponent,
    canActivate: [authGuard],
  },
];

export default adminRoutes;
