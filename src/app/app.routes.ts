import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/Home/home.component';
import { AboutComponent } from './components/pages/About/about.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
    },

    {
        path: 'about',
        component: AboutComponent,
        title: 'About',
    }
];
