import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Entry } from './entry.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Entry>;

@Injectable()
export class EntryService {

    private resourceUrl =  SERVER_API_URL + 'api/entries';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(entry: Entry): Observable<EntityResponseType> {
        const copy = this.convert(entry);
        return this.http.post<Entry>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(entry: Entry): Observable<EntityResponseType> {
        const copy = this.convert(entry);
        return this.http.put<Entry>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Entry>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Entry[]>> {
        const options = createRequestOption(req);
        return this.http.get<Entry[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Entry[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Entry = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Entry[]>): HttpResponse<Entry[]> {
        const jsonResponse: Entry[] = res.body;
        const body: Entry[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Entry.
     */
    private convertItemFromServer(entry: Entry): Entry {
        const copy: Entry = Object.assign({}, entry);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(entry.date);
        return copy;
    }

    /**
     * Convert a Entry to a JSON which can be sent to the server.
     */
    private convert(entry: Entry): Entry {
        const copy: Entry = Object.assign({}, entry);

        copy.date = this.dateUtils.toDate(entry.date);
        return copy;
    }
}
