import { Component, Inject } from '@angular/core';
import { formatRating } from '@bg-hoard/store/util-formatters';
import { HttpClient } from '@angular/common/http';
import { Game } from '@bg-hoard/util-intertface';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private http: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {
    console.log('component constructed');
  }
  title = 'Board Game Hoard';
  games = this.http.get<Game[]>(`${this.baseUrl}/api/games`);
  formatRating = formatRating;
}
