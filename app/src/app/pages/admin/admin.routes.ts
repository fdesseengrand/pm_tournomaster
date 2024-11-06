import { Routes } from "@angular/router";
import { authGuard } from "../../shared/auth/auth.guard";
import { APP_ROUTES } from "../../shared/constants/routes.constants";
import { MatchAdminComponent } from "./scores/match-admin.component";
import { TeamsAdminComponent } from "./teams/teams-admin.component";

/**
 * Admin routes.
 */
const adminRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: APP_ROUTES.admin.teams,
  },
  {
    path: APP_ROUTES.admin.teams,
    component: TeamsAdminComponent,
    canActivate: [authGuard],
  },
  {
    path: APP_ROUTES.scores,
    component: MatchAdminComponent,
    canActivate: [authGuard],
  },
];

export default adminRoutes;
