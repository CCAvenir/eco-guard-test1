import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5038/api/contact'; 

  constructor(private http: HttpClient) {}


  getMessages(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetMessages`);
  }

  addMessage(contactData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/AddMessage`, contactData, { headers });
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteMessage`, { params: { id } });
  }
}
