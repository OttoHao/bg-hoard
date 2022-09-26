import { Component } from '@angular/core';
import { getAllGames } from '../fake-api';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'Board Game Hoard';
  games = getAllGames();
}
