import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainConfig } from '../../../conf/main.config';

@Injectable({
    providedIn: 'root',
})
export class ObservationsService {
    constructor(private http: HttpClient) {}

    updateObservation(formData) {
        let url = `${MainConfig.API_ENDPOINT}/observations`;
        return this.http.patch(url, formData);
    }

    postObservation(formData) {
        let url = `${MainConfig.API_ENDPOINT}/observations`;
        return this.http.post(url, formData);
    }

    getStat(projectId: number) {
        const url = `${MainConfig.API_ENDPOINT}/stats`;
        const params = {};
        projectId ? (params['id_project'] = projectId) : null;
        return this.http.get(url, { params });
    }

    getNotValidatedObservations() {
        const params = {
            validation_process: 'true',
            validation_status__notequal: 'VALIDATED',
        };
        const url = `${MainConfig.API_ENDPOINT}/observations`;
        return this.http.get(url, { params });
    }

    getObservation(observationId: number) {
        return this.http.get<Object>(
            `${MainConfig.API_ENDPOINT}/observations/${observationId}`
        );
    }
}
