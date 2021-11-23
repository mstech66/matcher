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

  sortArrayByValue(arr, p) {
    return arr.sort(function(a,b) {
      return (a[p] > b[p]) ? -1 : (a[p] < b[p]) ? 1 : 0;
    });
  }

  findResults() {
    this.records.forEach(record => {
      let nameCol = this.columns[1]
      var temp = {
        '_id': record[this.columns[0]]
      };
      temp[nameCol] = record[nameCol];
      for (var i = 2; i < this.columns.length; i++) {
        var currentColumn = this.columns[i];
        var totalScore = 0;
        this.testRecords.forEach(test => {
          var controlAllels = record[currentColumn].split(','); //15
          var mixtureAllels = test[currentColumn].split(','); //15,16,17,18
          var totalMixtureAllels = mixtureAllels.length; //4
          var totalControlAllels = controlAllels.length; //1
          var totalMatchedAllels = 0;
          for (var x of controlAllels) {
            if (mixtureAllels.includes(x)) {
              totalMatchedAllels++; //1
              var index = mixtureAllels.indexOf(x);
              mixtureAllels.splice(index, 1);
            }
          }
          console.log(`totalMatchedAllels are ${totalMatchedAllels} totalSampleAllels are ${totalControlAllels} and totalTestAllels are ${totalMixtureAllels}`)
          //var score = 2 * totalMatchedAllels / (totalControlAllels + totalMixtureAllels); // 2 * 1 / 1+4 
          var score = (totalMatchedAllels / totalControlAllels)
          totalScore += score;
        });
        temp[currentColumn] = Math.round((totalScore * 100) * 100) / 100;
      }
      this.result.push(temp);
    });
    for(var y of this.result){
      var sum = 0;
      console.log(this.columns[2])
      for(var j=2; j<this.columns.length;j++){
        var temp = this.columns[j];
        sum += y[temp];
      }
      var totalColumn = this.columns.length - 2;
      console.log(sum + ' ' + totalColumn)
      y['Total'] = Math.round((sum / totalColumn) * 100) / 100;
    }
    this.result = this.sortArrayByValue(this.result, 'Total')
    console.log(this.result)
    // this.service.sendResult(this.result);
  }

  ngOnInit() {
    this.service.getSampleData().subscribe(data => {
      console.log('Sample Data: ', data);
      this.records = data;
      this.columns = Object.keys(data[0]);
      this.resColumns = Object.keys(data[0]).slice(1);
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
