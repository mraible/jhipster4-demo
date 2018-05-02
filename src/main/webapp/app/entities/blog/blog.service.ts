import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Blog } from './blog.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Blog>;

@Injectable()
export class BlogService {

    private resourceUrl =  SERVER_API_URL + 'api/blogs';

    constructor(private http: HttpClient) { }

    create(blog: Blog): Observable<EntityResponseType> {
        const copy = this.convert(blog);
        return this.http.post<Blog>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(blog: Blog): Observable<EntityResponseType> {
        const copy = this.convert(blog);
        return this.http.put<Blog>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Blog>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Blog[]>> {
        const options = createRequestOption(req);
        return this.http.get<Blog[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Blog[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Blog = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Blog[]>): HttpResponse<Blog[]> {
        const jsonResponse: Blog[] = res.body;
        const body: Blog[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Blog.
     */
    private convertItemFromServer(blog: Blog): Blog {
        const copy: Blog = Object.assign({}, blog);
        return copy;
    }

    /**
     * Convert a Blog to a JSON which can be sent to the server.
     */
    private convert(blog: Blog): Blog {
        const copy: Blog = Object.assign({}, blog);
        return copy;
    }
}
