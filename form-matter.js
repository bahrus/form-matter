import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { define } from 'xtal-element/XtalElement.js';
export class FormMatter extends XtalDecor {
    constructor() {
        super(...arguments);
        this.formMap = new WeakMap();
        this.on = {
            submit: ({ self }, e) => {
                console.log(e);
                e.preventDefault();
                const frm = e.target;
                if (!this.formMap.has(frm)) {
                    const formExtensionData = {
                        originalAction: frm.action,
                    };
                    this.formMap.set(frm, formExtensionData);
                }
                frm.submit();
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
