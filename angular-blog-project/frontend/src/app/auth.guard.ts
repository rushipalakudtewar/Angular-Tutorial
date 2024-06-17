import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth/services/auth.service";

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate { 
    constructor(private authService:AuthService,private router:Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // const token = this.authService.getUser().subscribe((res)=>{
        //     console.log(res.user.role);
            
        // });
        // console.log(token);

        
        
        if(this.authService.isAuthenticated())
            {
                return true
            }
        else{
            this.router.navigate(['/auth/login'])
            return false
        }
    }
}