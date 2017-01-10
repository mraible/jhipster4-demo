

import {
    Blog,
    Tag,
    } from '../';

export class Entry {
    constructor(
        public id?: number,
        public title?: string,
        public content?: string,
        public date?: any,
        public blog?: Blog,
        public tag?: Tag,
    ) { }
}
