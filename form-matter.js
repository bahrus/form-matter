import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { define } from 'xtal-element/XtalElement.js';
export class FormMatter extends XtalDecor {
    constructor() {
        super(...arguments);
        this.on = {
            submit: ({ self }, e) => {
                console.log(e);
                e.preventDefault();
            }
        };
        this.actions = [];
        this.init = (h) => {
            console.log('iah');
        };
    }
}
FormMatter.is = 'form-matter';
define(FormMatter);
