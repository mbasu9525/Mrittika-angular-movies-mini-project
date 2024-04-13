import { Component, OnInit } from '@angular/core';
import { MovieDetail } from '../../../shared/models/movie-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { DurationPipe } from '../../../shared/pipes/duration.pipe';
import { MovieServiceService } from '../../../shared/services/movie-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CurrencyFormatPipe,
    DurationPipe,
    CommonModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{
  movieDetailsData : MovieDetail = {
    id: '',
    title: '',
    duration: '',
    budget: '',
    release_date: '',
    box_office: '',
    cinematographers: [],
    poster: '',
    producers: [],
    summary: ''
  };

  movieId: string = '';
  loadingState: string = 'loading'

  constructor(private router: Router, private route: ActivatedRoute, private movieService: MovieServiceService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params?.['id']){
        this.movieId = params?.['id'];
        this.getMovieDetails();
      }else{
        this.loadingState = 'error'
      }
    })
  }

  getMovieDetails() : void {
    this.movieService.getMovieDetails(this.movieId).subscribe((data: MovieDetail) => {
      if(data){
        this.movieDetailsData = data;
        this.loadingState = 'success'
      }else{
        this.loadingState = 'error'
      }
    })
  }

  goBack(): void {
    this.router.navigate(['/movies']);
  }

  getNamesData(data: string[]): string {
    return data.join(', ')
  }
  
}
