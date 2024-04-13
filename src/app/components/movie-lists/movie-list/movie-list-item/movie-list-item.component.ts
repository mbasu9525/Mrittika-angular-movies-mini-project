import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieList } from '../../../../shared/models/movie-lst';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-movie-list-item',
  standalone: true,
  imports: [
    CurrencyFormatPipe,
    DurationPipe
  ],
  templateUrl: './movie-list-item.component.html',
  styleUrl: './movie-list-item.component.css'
})
export class MovieListItemComponent {
  @Input() movie!: MovieList;
  @Output() detailsBtnClick : EventEmitter<string> = new EventEmitter<string>();

  detailsButtonClicked(id: string): void {
    this.detailsBtnClick.emit(id);
  }

}
