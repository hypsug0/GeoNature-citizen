import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/config.service';

@Injectable({
    providedIn: 'root',
})
export class ObservationsService {
    constructor(
        private http: HttpClient,
        private configService: AppConfigService
    ) {}

    updateObservation(formData) {
        const url = `${this.configService.apiUrl}/observations`;
        return this.http.patch(url, formData);
    }

    postObservation(formData) {
        const url = `${this.configService.apiUrl}/observations`;
        return this.http.post(url, formData);
    }

    getStat() {
        const url = `${this.configService.apiUrl}/stats`;
        return this.http.get(url);
    }

    getNotValidatedObservations() {
        const params = {
            validation_process: 'true',
            validation_status__notequal: 'VALIDATED',
        };
        const url = `${this.configService.apiUrl}/observations`;
        return this.http.get(url, { params });
    }

    getObservation(observationId: number) {
        return this.http.get<Object>(
            `${this.configService.apiUrl}/observations/${observationId}`
        );
    }
}
