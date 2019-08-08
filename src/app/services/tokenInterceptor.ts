import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    
    constructor(
        private authService: AuthenticationService
    ){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + this.authService.idTokenSubject.value
            }
        });

        return next.handle(request);
    }
}