import {XtalDecor} from 'xtal-decor/xtal-decor.js';
import {define} from 'xtal-element/XtalElement.js';

export interface FormExtensionData {
    originalAction: string;
}

export class FormMatter extends XtalDecor {
    static is = 'form-matter';
    formMap = new WeakMap<HTMLFormElement, FormExtensionData>();
    on = {
        submit: ({self}: any, e: Event) => {
            console.log(e);
            e.preventDefault();
            const frm = e.target as HTMLFormElement;
            if(!this.formMap.has(frm)){
                const formExtensionData = {
                    originalAction: frm.action,
                } as FormExtensionData;
                this.formMap.set(frm, formExtensionData);
            }
            frm.submit();
        }
    }
    actions = [];

    init = (h: HTMLElement) => {
        console.log('iah');
    }
}
define(FormMatter);

