import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { orderTypes, errorMessages, VALUES } from '../../config/constants';
import { ModalOpeningService } from '../../services/modal-opening.service';
import { CommonService } from '../../services/common.service';
import { CreateOrderService } from '../../services/createOrder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomSchemaService } from './services/custom-schema-service';
import { CustomSchemaFormBuilder } from './custom-schema.formbuilder';

@Component({
  selector: 'app-custom-schema',
  templateUrl: './custom-schema.component.html',
  styleUrls: ['./custom-schema.component.css']
})
export class CustomSchemaComponent implements OnInit {

  proceedBtnText: string;
  orderId: string;
  nCC: string;
  assetId: string;
  productName: string;
  routerUrl: string;
  orderType: string;
  value: any;

  public schema: any;
  public productConfigForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private modalOpeningService: ModalOpeningService,
    private customSchemaService: CustomSchemaService,
    private createOrderService: CreateOrderService,
    private customSchemaFormBuilder: CustomSchemaFormBuilder
  ) { }

  ngOnInit() {
    /* for buttons */
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      this.nCC = params['nCC'];
      this.assetId = params['assetId'];
      this.productName = params['product'];
    });
    this.routerUrl = this.router.url;
    const orderDetails = this.commonService.getOrderDetailsFromRouteUrl(this.routerUrl);
    this.orderType = orderDetails.orderType;
    this.proceedBtnTextCreation();

    /* fetching prodcut details */
    this.fetchProductDetails();
  }

  /* fetching prodcut details */
  fetchProductDetails() {
    this.customSchemaService.getProductDetails(this.orderId).subscribe((response) => {
      /* fetching schema by product Id */
      this.customSchemaService.getProductSchema(response.productId).subscribe((schemaResponse) => {
        this.schema = schemaResponse;

        /* creating REACTIVE FORM from JSON SCHEMA */
        this.productConfigForm = this.customSchemaFormBuilder.reactiveFormCreation(this.schema);

        /*changin Date object in the format required for my-date-picker*/
        let productConfigString = JSON.stringify(response);
        const dates = productConfigString.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gm);
        if (dates) {
          for (const date of dates) {
            const datesArray = date.split('-');
            const modifiedDate = date + 'T18:30:00.000Z';
            const createDate = `{"date":{"year": ` + Number(datesArray[0]).toString() + `,
            "month": ` + Number(datesArray[1]).toString() + `,"day": ` + Number(datesArray[2]).toString() + `},
            "jsdate":"` + modifiedDate + `","formatted":"` + date + `","epoc": 1526927400}`;

            productConfigString = productConfigString.replace('"' + date + '"', createDate);
          }
          this.productConfigForm.patchValue(JSON.parse(productConfigString));
        } else {
          this.productConfigForm.patchValue(response);
        }
      }, error => {
        this.commonService.displayServerError(error, 'Server Eror - Fetching Product Schema');
      });
    }, error => {
      this.commonService.displayServerError(error, 'Server Eror - Fetching Product config details');
    });
  }

  /** Called on click of QUIT button */
  onClickQuit() {
    this.modalOpeningService.confirmOnQuit().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.commonService.clearLocalStorageValues();
        this.router.navigate(['/dashboard']);
      }
    });
  }

  /** Called on click of PREVIOUS button */
  onClickBack() {
    this.saveProductDetails('back');
  }

  onClickProceed() {
    this.saveProductDetails('proceed');
  }

  onClickSave() {
    const isFormInvalid = this.commonService.findInvalidErrors(this.productConfigForm);
    if (isFormInvalid) {
      return this.modalOpeningService.errorPopUP(errorMessages.Save_As_Draft_error);
    }
    this.saveProductDetails();
  }

  proceedBtnTextCreation() {
    this.proceedBtnText = this.commonService.createProceedBtnText(this.routerUrl, 'productConfig');
  }

  saveProductDetails(eventType?) {
    const dataOnClickOfSaveOnly = this.productConfigForm.getRawValue();
    this.modifyDateFormat(this.schema);
    const requestObject = this.productConfigForm.getRawValue();

    this.customSchemaService.saveProductDetails(requestObject, this.orderId).subscribe(response => {
      if (eventType === 'proceed') {
        sessionStorage.setItem('productConfigForSummary', JSON.stringify(response));
        this.navigateToNextScreen();
      } else if (eventType === 'back') {
        const prevUrl = this.createOrderService.routeOfPreviousScreen(this.routerUrl);
        this.router.navigateByUrl(prevUrl);
      } else {
        this.productConfigForm.patchValue(dataOnClickOfSaveOnly);
      }
    }, error => {
      this.commonService.displayServerError(error, 'Server Eror - saving prod config details');
    });
  }

  /*Converting date format from my-date-picker object to YYYY-MM-DD format*/
  modifyDateFormat(schema) {
    const keys = Object.keys(schema.properties);
    for (const key of keys) {
      if (schema.properties[key].type === 'object') {
        this.modifyDateFormat(schema.properties[key]);
      } else if (schema.properties[key].fieldType === 'date' && this.productConfigForm.controls[key].value) {
        this.productConfigForm.controls[key].patchValue(this.productConfigForm.controls[key].value.formatted);
      }
    }
  }


  navigateToNextScreen() {
    /** forming query params object */
    const queryParamsObj = { 'orderId': this.orderId, 'nCC': this.nCC, 'assetId': this.assetId, product: this.productName };

    /** setting this screen as completed */
    sessionStorage.completedScreenName = 'Product Configuration';

    /** to get the url of next screen so as to navigate to it */
    const url = this.commonService.createNextScreenUrlPath(this.routerUrl, 'productConfig');

    this.router.navigate([url], { queryParams: queryParamsObj });
  }

}
