import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
    ActivatedRoute,
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

import { GncProgramsService } from '../api/gnc-programs.service';
import { Program } from './programs.models';

@Injectable({
    providedIn: 'root',
})
export class ProgramsResolve implements Resolve<Program[]> {
    projectId: string | null = null;
    constructor(
        private programService: GncProgramsService,
        private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe((params) => {
            this.projectId = params['projectId'];
        });
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Program[]> | Observable<never> {
        // console.warn("resolve::getAllPrograms");

        return this.programService.getAllPrograms(this.projectId).pipe(
            catchError((error) => {
                console.error(error);
                //window.alert(error);
                return EMPTY;
            }),
            mergeMap((programs: Program[]) => (programs ? of(programs) : EMPTY))
        );
    }
}
