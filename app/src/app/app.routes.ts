import { Routes } from '@angular/router';
import { ConsultationComponent } from './pages/consultation/consultation/consultation.component';
import { LoginComponent } from './pages/login/login/login.component';
import { APP_ROUTES } from './shared/constants/routes.constants';

/**
 * Main routes of the application.
 */
export const routes: Routes = [
    { path: '', redirectTo: APP_ROUTES.consultation, pathMatch: 'full' },
    { path: APP_ROUTES.login, component: LoginComponent, },
    { path: APP_ROUTES.consultation, component: ConsultationComponent },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.routes')
    },
    { path: '**', redirectTo: APP_ROUTES.consultation }
];
