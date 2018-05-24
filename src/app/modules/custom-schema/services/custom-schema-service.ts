import { Injectable } from '@angular/core';
import { URL, VALUES } from '../../../config/constants';
import { Apiservice } from '../../../services/api.service';

@Injectable()
export class CustomSchemaService {

    private _urlGetProduct = URL.CUSTOM_SCHEMA_BASEURL + URL.CUSTOM_SCHEMA_FETCH_PRODUCT_INFO;
    private _urlSaveProduct = URL.CUSTOM_SCHEMA_BASEURL + URL.CUSTOM_SCHEMA_SAVE_PRODUCT_INFO;
    private _urlGetProductSchema = URL.CUSTOM_SCHEMA_BASEURL + URL.CUSTOM_SCHEMA_GET_PRODUCT_SCHEMA;

    constructor(private apiService: Apiservice) { }

    getProductDetails(orderID: string) {
        return this.apiService.get(this._urlGetProduct + orderID);
    }

    getProductSchema(productID) {
        return this.apiService.get(this._urlGetProductSchema + productID);
    }

    saveProductDetails(productConfigObject, orderID) {
        return this.apiService.post(this._urlSaveProduct + orderID, productConfigObject);
    }
}
