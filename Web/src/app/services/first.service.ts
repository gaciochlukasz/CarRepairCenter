import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FirstService {

constructor(private http: HttpClient) { }

visitId = 5;
url = 'http://localhost:5200/garage';

getnumber(visitId: number) {
    return this.http.get(`${this.url}?visitId=${visitId}`);
}
}
