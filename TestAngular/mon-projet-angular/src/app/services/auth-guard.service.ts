import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.services";

@Injectable()

//Goal: Empécher l'accés à certaine routes à l'utilisateur
//Format générique de la méthode AuthGuard
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router){}

    canActivate(
        routes: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        if(this.authService.isAuth){
            return true;
        }else{
            this.router.navigate(['/auth']);
        }
        return false;
    }
}