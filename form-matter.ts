import {XtalDecor} from 'xtal-decor/xtal-decor.js';
import {define} from 'xtal-element/XtalElement.js';

export class FormMatter extends XtalDecor {
    static is = 'form-matter'
    
    on = {
        submit: ({self}: any, e: Event) => {
            console.log(e);
            e.preventDefault();
        }
    }
    actions = [];

    init = (h: HTMLElement) => {
        console.log('iah');
    }
}
define(FormMatter);

