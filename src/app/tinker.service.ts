import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TinkerService {

  constructor(private http: HttpClient) { }

  uploadCSV1(file) {
    return this.http.post('uploadCSV1', file).subscribe(data => {
      console.log(data, 'from server');
    });
  }
  uploadCSV2(file) {
    return this.http.post('uploadCSV2', file).subscribe(data => {
      console.log(data, 'from server');
    });
  }
  sendResult(json) {
    return this.http.post('result', json).subscribe(data => {
      console.log(data, 'from server');
    });
  }
  getSampleData() {
    return this.http.get('sample');
  }
  getTestData() {
    return this.http.get('test');
  }
}
