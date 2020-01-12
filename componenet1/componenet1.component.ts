import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ExcelService } from '../excel.service';
@Component({
  selector: 'app-componenet1',
  templateUrl: './componenet1.component.html',
  styleUrls: ['./componenet1.component.scss']
})

export class Componenet1Component  {

  display: boolean = false;
  // tslint:disable-next-line: member-ordering

  data: any;

myfinal: any;
orgdata:any;

sheetName :any[];


  constructor(private excelService: ExcelService, private http: HttpClient) {
    this.sheetName = [
      {name: 'PCR', code: 'pcr'},
      {name: '1182 Data', code: '1182'}
    ];
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);

      this.setDownload(dataString);
    };
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
  let options = { headers: headers };
    this.http.post("http://localhost:3000/users",data
    ,options)
.subscribe(
data  => {
console.log("POST Request is successful ", data);
},
error  => {

console.log("Error", error);

}

);
}

makeRequest() {
  this.http.get('http://localhost:3000/users')
  .toPromise().then(data => {
    console.log(data);
// tslint:disable-next-line: align
this.data = data;
// tslint:disable-next-line: align
const stringify = JSON.parse(JSON.stringify(this.data));
// tslint:disable-next-line: align
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < stringify.length; i++) {
    // tslint:disable-next-line: no-string-literal
    this.myfinal = stringify[i]['Sheet1'];

    this.orgdata = JSON.stringify(this.myfinal);
}});

}

CreateTableFromJSON() {
  this.makeRequest();
  // EXTRACT VALUE FOR HTML HEADER.
  // ('Book ID', 'Book Name', 'Category' and 'Price')
  var col = [];
  for (var i = 0; i < this.myfinal.length; i++) {
      for (var key in this.myfinal[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
      }
  }
  console.log(col[2]);

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1);                   // TABLE ROW.

  for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");      // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  // tslint:disable-next-line: prefer-for-of
  // tslint:disable-next-line: no-shadowed-variable
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.myfinal.length; i++) {

      tr = table.insertRow(-1);

      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < col.length; j++) {
          // tslint:disable-next-line: prefer-const
          let tabCell = tr.insertCell(-1);
          // tslint:disable-next-line: curly
          if (typeof  this.myfinal[i][col[j]] !== 'undefined')
                tabCell.innerHTML = this.myfinal[i][col[j]];
                else {
                tabCell.innerHTML = '';
          }
      }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.

  this.display = true;
  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);

}
exportToExcel(event) {
  this.excelService.exportAsExcelFile(this.myfinal, 'persons');
}

}
