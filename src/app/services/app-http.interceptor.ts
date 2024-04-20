import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private appState: AppStateService,private loadingService:LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.appState.setProductState({
    //   status: "LOADING"
    // })
    this.loadingService.showLoadingSpinner()
    let req = request.clone({
      headers: request.headers.set("Authorization", "Bearer JWT")
    });
    return next.handle(req).pipe(
      finalize(()=>{
        // this.appState.setProductState({
        //   status:"LOADED"
        // })
        this.loadingService.hideLoadingSpinner()
      })
    )
  }

}
