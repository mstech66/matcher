import { Component, OnInit } from '@angular/core';
import { TinkerService } from '../tinker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  file1: File = null;
  file2: File = null;
  file1Info = 'Upload Reference CSV Here';
  file2Info = 'Upload Query CSV Here';
  disabled1 = false;
  disabled2 = false;
  showOrHide = true;

  constructor(private tinkerService: TinkerService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(event) {
    event.preventDefault();
    this.onUploadOne();
    this.onUploadTwo();
    this.showOrHide = false;
    setTimeout(() => {
      this.router.navigateByUrl('/match');
    }, 5000);
  }

  onFileChangeOne(event) {
    // this.file1 = event.target.files[0] as File;
    this.file1 = event[0] as File;
    this.file1Info = 'Sample CSV: ' + this.file1.name;
    console.log('onFileChangeOne Event...', event);
    console.log('onFileChangeOne...', this.file1);
  }

  onFileChangeTwo(event) {
    // this.file2 = event.target.files[0] as File;
    this.file2 = event[0] as File;
    this.file2Info = 'Test CSV: ' + this.file2.name;
    console.log('onFileChangeTwo Event...', event);
    console.log('onFileChangeTwo...', this.file2);
  }

  onUploadOne() {
    const fd = new FormData();
    fd.append('csv1', this.file1, this.file1.name);
    this.tinkerService.uploadCSV1(fd);
    console.log(this.file1.name);
  }

  onUploadTwo() {
    const fd = new FormData();
    fd.append('csv2', this.file2, this.file2.name);
    this.tinkerService.uploadCSV2(fd);
    console.log(this.file2.name);
  }

}
