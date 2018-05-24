import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormsModule } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';

@Injectable()

export class CustomSchemaFormBuilder {

    constructor() { }

    reactiveFormCreation(productSchema) {
        const elements = productSchema.properties;
        const keys = Object.keys(productSchema.properties);

        const productSchemaForm = new FormGroup({});

        for (const key of keys) {
            if (elements[key].type !== 'object') {
                const control = new FormControl('');
                if (elements[key].required) {
                    control.setValidators(Validators.required);
                }
                if (elements[key].pattern) {
                    control.setValidators(Validators.pattern(elements[key].pattern));
                }
                if (elements[key].disabled) {
                    control.disable();
                }
                if (elements[key].minLength) {
                    control.setValidators(Validators.minLength(elements[key].minLength));
                }
                productSchemaForm.addControl(key, control);
            } else {
                const group = this.reactiveFormCreation(elements[key]);
                productSchemaForm.addControl(key, group);
            }
        }
        return productSchemaForm;
    }
}
