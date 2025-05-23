import { Component } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero-service.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-hero-search',
  imports: [RouterLink, AsyncPipe, NgFor],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss',
})
export class HeroSearchComponent {
  heroes$?: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private heroService: HeroService) {}
  search(term: string) {
    this.searchTerms.next(term); //emits value
    console.log(this.searchTerms);
  }
  ngOnInit() {
    // not just .subscribe(), but all the pipe operators (like debounceTime, filter, map, switchMap, etc.) also react automatically when a new value is emitted.

    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // Only switchMap (or similar operators like mergeMap, concatMap, exhaustMap) is used to actually trigger the HTTP request in your pipe
      // this.searchTerms is a Subject — it emits values whenever you call this.searchTerms.next(value).
      // Those emitted values flow through the operators in the .pipe() one by one, in order.
      switchMap((term) => this.heroService.searchHeroes(term))
    );
    // Remember that the component class doesn't subscribe to the heroes$ observable. That's the job of the AsyncPipe in the template.
  }
}
