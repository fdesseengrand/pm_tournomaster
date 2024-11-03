import { Routes } from '@angular/router';
import { authGuard } from '../../shared/auth/auth.guard';
import { SetResultsComponent } from './results/set-results.component';
import { CreateTeamComponent } from './teams/create-team.component';

/**
 * Admin routes.
 */
const adminRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'teams'
    },
    {
        path: 'teams',
        component: CreateTeamComponent,
        canActivate: [authGuard]
    },
    {
        path: 'results',
        component: SetResultsComponent,
        canActivate: [authGuard]
    }
];

export default adminRoutes;
