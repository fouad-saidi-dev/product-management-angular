import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private appState: AppStateService) {
  }

  async login(username: string, password: string): Promise<any> {
    try {
      let user: any = await firstValueFrom(this.http.get(`http://localhost:8089/users/${username}`));//firstValueForm : convert observable to promise
      console.log(password)
      console.log(user.password)
      console.log(btoa(password)); //atob for decode && btoa encode


      if (user.password === btoa(password)) {
        let decodedJwt: any = jwtDecode(user.token);
        console.log(decodedJwt.sub,decodedJwt.username)
        this.appState.setAuthState({
          isAuthenticated: true,
          username: username,
          roles: decodedJwt.roles,
          token: user.token
        });
        return Promise.resolve(true);
      } else {
        return Promise.reject("Bad credentials")
      }
    } catch (e) {
      return Promise.reject("Network error")
    }
  }
}
