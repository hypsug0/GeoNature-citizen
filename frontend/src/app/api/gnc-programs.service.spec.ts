import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { GncProgramsService } from './gnc-programs.service';
import { AppConfigService } from '../services/config.service';

describe('GncProgramsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AppConfigService],
        })
    );

    it('should be created', () => {
        const service: GncProgramsService = TestBed.get(GncProgramsService);
        expect(service).toBeTruthy();
    });
});
