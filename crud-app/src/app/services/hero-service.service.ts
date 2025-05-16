import { Hero } from '../interfaces/hero';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
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
      console.error(err);
      console.log(operation);
      return of(result);
    };
  }
}
