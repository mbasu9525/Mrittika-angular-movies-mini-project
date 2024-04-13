import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MovieList } from '../../../shared/models/movie-lst';
import { MovieListItemComponent } from './movie-list-item/movie-list-item.component';
import { MovieServiceService } from '../../../shared/services/movie-service.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MovieListItemComponent
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{
  moviesResponse: MovieList[] = [];
  filteredMoviesResponse: MovieList[] = [];
  filterForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    releaseYear: new FormControl(''),
  });
  constructor(private router: Router, private movieService: MovieServiceService) {}

  ngOnInit() : void {
    this.getMovieList();
    this.listenToFormValueChange();
  }

  listenToFormValueChange() : void {
    this.filterForm.controls['title'].valueChanges.subscribe((val: string) => {
        this.filterMovieList();
    });
    this.filterForm.controls['releaseYear'].valueChanges.subscribe((val: number) => {
      this.filterMovieList();
    });
  }

  getMovieList(): void {
    this.movieService.getMoviesList().subscribe((data: MovieList[]) => {
      if(data){
        this.moviesResponse = data;
        this.filteredMoviesResponse = this.moviesResponse
      }
    })
  }

  filterMovieList() : void {
    let title : string = this.filterForm.controls['title'].value;
    let year : string = this.filterForm.controls['releaseYear'].value ? this.filterForm.controls['releaseYear'].value.toString() : '';
    if(title && year){
      this.filteredMoviesResponse = this.moviesResponse.filter((ele: MovieList) => {
        let yr: string = ele.release_date.split('-')[0];
        return (ele.title.toLowerCase().includes(title.toLowerCase()) && yr.includes(year));
      });
    }else if(title){
      this.filteredMoviesResponse = this.moviesResponse.filter((ele: MovieList) => {
        return ele.title.toLowerCase().includes(title.toLowerCase());
      });
    }
    else if(year){
      this.filteredMoviesResponse = this.moviesResponse.filter((ele: MovieList) => {
        let yr: string = ele.release_date.split('-')[0];
        return yr.includes(year);
      });
    }else{
      this.filteredMoviesResponse = this.moviesResponse
    }
  }

  navigateToDetailsPage(id: string) : void {
    this.router.navigate(['/movies', id]);
  }

}
