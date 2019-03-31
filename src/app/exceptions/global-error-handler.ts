import { ErrorHandler, Injectable } from '@angular/core';


@Injectable()
export class GlobalErrorHandler extends ErrorHandler{

    constructor() {
      super();
    }

    handleError(error: any): void {
      
      console.log(error.message)
      super.handleError(error);
    }

}
