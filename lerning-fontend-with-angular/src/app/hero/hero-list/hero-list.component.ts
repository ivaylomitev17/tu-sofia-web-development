import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Hero } from '../hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  public heroes: any;
  public heroDialog: boolean = false;
  public hero: Hero = {} as Hero;
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.loadAllHeroes();
  }

  showDialog(){
    this.heroDialog = true;
  }

  createHero(){
    this.heroService.createHero(this.hero).subscribe({
      next: (hero) => {
        console.log(hero);
        this.hero = {} as Hero;
        this.heroDialog = false;
        this.loadAllHeroes();
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.heroDialog = false;
  }


  loadAllHeroes(){
    this.heroService.getAllHeroes().subscribe({
      next: (heroes: any) => {
        let parsedHeroes = heroes.map ((h: any) => {
          return {...h, powers: h.powers.map((s: any) => s.name)}
        })
        this.heroes = parsedHeroes;
      },
      error: (err) => {},
    });
  }
}