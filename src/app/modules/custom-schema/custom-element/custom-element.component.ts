import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-element',
  templateUrl: './custom-element.component.html',
  styleUrls: ['./custom-element.component.css']
})
export class CustomElementComponent implements OnInit {

  @Input() properties;
  @Input() productConfigForm: FormGroup;

  public keys = {};
  public elementKeys = {};

  currentDate: Date = new Date();
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    width: '138px',
    disableUntil: {
      year: this.currentDate.getFullYear(),
      month: this.currentDate.getMonth() + 1,
      day: this.currentDate.getDate(),
    },
    showClearDateBtn: false,
  };

  constructor() { }

  ngOnInit() {
    this.keys = Object.keys(this.properties);
  }

  getKeyName(key) {

    console.log(this.productConfigForm.controls[key].value);
    return key;
  }

  dateChange(event) {
    console.log(event.formatted);
  }

}
