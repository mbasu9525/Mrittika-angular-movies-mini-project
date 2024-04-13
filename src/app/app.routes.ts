import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details/movie-details.component';
import { MovieListComponent } from './components/movie-lists/movie-list/movie-list.component';

export const routes: Routes = [
    { path: '', component: MovieListComponent },
    { path: 'movies', component: MovieListComponent },
    { path: 'movies/:id', component: MovieDetailsComponent },
    { path: '**', component: MovieListComponent },
];
