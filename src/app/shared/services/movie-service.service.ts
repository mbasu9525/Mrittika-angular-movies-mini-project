import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieList } from '../models/movie-lst';
import { Observable, map } from 'rxjs';
import { MovieDetail } from '../models/movie-detail';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http: HttpClient) { }

  getMoviesList(): Observable<MovieList[]> {
    return this.httpNetworkHandler<MovieList[]>('/movies');
  }

  getMovieDetails(id: string) : Observable<MovieDetail> {
    return this.httpNetworkHandler<MovieDetail>(`/movies/${id}`);
  }

  private httpNetworkHandler<T>(api: string): Observable<T> {
    return this.http.get<T>(api).pipe(
      map((response: T) => response)
    )
  }
}
