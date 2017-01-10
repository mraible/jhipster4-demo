import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Entry } from './entry.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class EntryService {

    private resourceUrl: string =  'api/entries';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(entry: Entry): Observable<Entry> {
        let copy: Entry = Object.assign({}, entry);
        copy.date = this.dateUtils.toDate(entry.date);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(entry: Entry): Observable<Entry> {
        let copy: Entry = Object.assign({}, entry);

        copy.date = this.dateUtils.toDate(entry.date);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Entry> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();

            jsonResponse.date = this.dateUtils.convertDateTimeFromServer(jsonResponse.date);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options: any = {};
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('filter', req.filter);

            options.search = params;
        }
        // TODO Use Response class from @angular/http when the body field will be accessible directly
        return this.http.get(this.resourceUrl, options).map((res: any) => {
            let jsonResponse = res.json();
            for (let i = 0; i < jsonResponse.length; i++) {
                jsonResponse[i].date = this.dateUtils.convertDateTimeFromServer(jsonResponse[i].date);
            }
            res._body = jsonResponse;
            return res;
        });
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

}
