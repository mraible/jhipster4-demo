import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Entry } from './entry.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntryService {

    private resourceUrl =  SERVER_API_URL + 'api/entries';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(entry: Entry): Observable<Entry> {
        const copy = this.convert(entry);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entry: Entry): Observable<Entry> {
        const copy = this.convert(entry);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Entry> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Entry.
     */
    private convertItemFromServer(json: any): Entry {
        const entity: Entry = Object.assign(new Entry(), json);
        entity.date = this.dateUtils
            .convertDateTimeFromServer(json.date);
        return entity;
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
