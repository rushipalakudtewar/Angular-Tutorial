import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { exhaustMap,map,pipe } from "rxjs";
import { EmptyAction, ShowAlert } from "./App.action";

@Injectable()
export class AppEffects{
    constructor(private action$:Actions,private snackbar:MatSnackBar){

    }
    _ShowAlert = createEffect(()=>
        this.action$.pipe(
            ofType(ShowAlert),
            exhaustMap(action=>{
                return this.ShowsnackbarAlert(action.message,action.actionResult)
                .afterDismissed()
                .pipe(
                    map(()=>{
                        return EmptyAction();
                    })
                )
            }
            )
        )    
    )
    ShowsnackbarAlert(message:string,actionResult:string='fail')
    {
        let _class = actionResult=='pass'? 'green-snackbar' : 'red-snackbar';
        return this.snackbar.open(message,'OK',
            {
                verticalPosition:'top',
                horizontalPosition:'end',
                duration:3000,
                panelClass:[_class]
            }
        )
    }
}