import { Hero } from '../interfaces/hero';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// Note:You don’t see network (tab) requests because Angular’s InMemoryWebApi handles them without hitting a real server.
// This is expected behavior.
// No Network tab → rely on:
// console.log
// DOM inspection (Inspect Element)
// Angular error messages in the console
export class HeroService {
  constructor(private http: HttpClient) {}
  // Define the heroesUrl of the form :base/:collectionName with the address of the heroes resource on the server. Here base is the resource to which requests are made, and collectionName is the heroes data object in the in-memory-data-service.ts.
  private heroesUrl = 'api/heroes';
  getHeroes(): Observable<Hero[]> {
    // HttpClient.get() returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Hero[]> , adds TypeScript capabilities, which reduce errors during compile time.
    //  get() is a generic function
    return (
      this.http
        .get<Hero[]>(this.heroesUrl)
        // pipe() is used to connect operators to an Observable.
        // To transform or handle the data before it reaches subscribe().
        .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])))
    );
  }

  handleError<T>(operation: string, result: T) {
    return (err: any): Observable<T> => {
      console.log(err);
      console.log(operation);
      return of(result);
    };
  }

  // get hero by id
  getHero(id: number): Observable<Hero> {
    let url = `${this.heroesUrl}/${id}`;
    return this.http
      .get<Hero>(url)
      .pipe(
        catchError(
          this.handleError<Hero>('Get a Hero', { id: 0, name: 'fallback' })
        )
      );
  }
  // Update hero
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  // InMemoryWebApi doesn’t persist changes — it stores them in memory only during runtime. When you reload the app, the data resets to the original array from createDb().
  // So after an update, the change is only visible until you refresh.
  // If you reload, it goes back to the original.
  // The HttpClient.put() method takes three parameters:

  // The URL
  // The data to update, which is the modified hero in this case
  // Options
  updateHero(hero: Hero): Observable<any> {
    return this.http
      .put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('Update Hero', 'failed to update'))
      );
  }

  // Add Hero

  addHero(hero: any): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(catchError(this.handleError<Hero>('Add a hero', hero)));
  }

  // Delete Hero
  deleteHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .delete<Hero>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Hero>('Delete a Hero', hero)));
  }

  // Search hero by name
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) return of([]);
    return this.http
      .get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(catchError(this.handleError<Hero[]>('Search Heroes', [])));
  }
}

//UPDATE HERO

//   updateHero(hero: Hero): Observable<Hero> {
//   return this.http
//     .put<Hero>(this.heroesUrl, hero, this.httpOptions)
//     .pipe(catchError(this.handleError<Hero>('Update a Hero', hero)));
// }

// ADD HERO

// addHero(hero: any): Observable<Hero> {
//   return this.http
//     .post<Hero>(this.heroesUrl, hero)
//     .pipe(
//       catchError(
//         this.handleError<Hero>('Add a hero', { id: 0, name: 'fallback' })
//       )
//     );
// }
