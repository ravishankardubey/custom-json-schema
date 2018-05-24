import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import { CustomSchemaComponent } from './custom-schema/custom-schema.component';
import { CustomElementComponent } from './custom-schema/custom-element/custom-element.component';
import { ShowErrorComponent } from '../components/common/show-error/show-error.component';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MyDatePickerModule],
  declarations: [
    CustomSchemaComponent,
    CustomElementComponent,
    ShowErrorComponent
  ],
  exports:  [
    CustomSchemaComponent,
    ShowErrorComponent
  ]
})
export class CustomSchemaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomSchemaModule,
      providers: []
    };
  }
}

