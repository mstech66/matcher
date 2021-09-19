import { Component, OnInit } from '@angular/core';
import { TinkerService } from '../tinker.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  records = null;
  columns = null;
  totalCols = null; // for calculations total no of columns...
  props = new Array();
  testRecords = null;
  result = [];
  resColumns = null;

  constructor(private service: TinkerService) { }

  // createProps() {
  //   this.records.forEach(value => {
  //     this.columns.forEach(headers => {
  //       console.log(value[headers]);
  //     });
  //   });
  // }

  findResults() {
    this.records.forEach(record => {
      var temp = {
        '_id': record['_id'],
        'Name': record['Name']
      };
      for (var i = 2; i < this.columns.length; i++) {
        var currentColumn = this.columns[i];
        var totalScore = 0;
        this.testRecords.forEach(test => {
          var sampleAllels = record[currentColumn].split(',');
          var testAllels = test[currentColumn].split(',');
          var totalTestAllels = testAllels.length;
          var totalSampleAllels = sampleAllels.length;
          var totalMatchedAllels = 0;
          for (var x of sampleAllels) {
            if (testAllels.includes(x)) {
              totalMatchedAllels++;
              var index = testAllels.indexOf(x);
              testAllels.splice(index, 1);
            }
          }
          console.log(`totalMatchedAllels are ${totalMatchedAllels} totalSampleAllels are ${totalSampleAllels} and totalTestAllels are ${totalTestAllels}`)
          var score = 2 * totalMatchedAllels / (totalSampleAllels + totalTestAllels);
          totalScore += score;
        });
        temp[currentColumn] = totalScore * 100;
      }
      this.result.push(temp);
    });
    for(var y of this.result){
      var sum = 0;
      for(var j=2; j<this.columns.length;j++){
        var temp = this.columns[j];
        sum += y[temp];
      }
      y['Total'] = `${sum / this.columns.length}%`;
    }
    // this.service.sendResult(this.result);
  }

  ngOnInit() {
    this.service.getSampleData().subscribe(data => {
      console.log('Sample Data: ', data);
      this.records = data;
      this.columns = Object.keys(data[0]);
      this.resColumns = Object.keys(data[0]);
      this.resColumns.push('Total');
      this.totalCols = this.columns.length;
      console.log(this.columns, this.totalCols, this.resColumns);
      // this.createProps();
    });

    this.service.getTestData().subscribe(data => {
      console.log('Test Data: ', data);
      this.testRecords = data;
    });
    setTimeout(() => {
      this.findResults();
    }, 5000)
  }

}
