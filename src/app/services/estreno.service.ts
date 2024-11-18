import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstrenoService {

  private apiURL = 'https://api-discso.onrender.com'; // URL de la API

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  // Método para obtener todos los estrenos
  getEstrenos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/`, this.httpOptions).pipe(
      retry(1), // Reintento en caso de error
      catchError(this.handleError) // Manejo de errores
    );
  }

  getEstrenoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`, this.httpOptions).pipe(
      retry(1), // Reintenta una vez en caso de error
      catchError(this.handleError) // Maneja los errores
    );
  }
  



  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status}, ${error.message}`;
    }
    console.error(errorMessage);
    return throwError('Hubo un problema, intenta más tarde.');
  }
}
