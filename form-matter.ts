import {XtalDecor} from 'xtal-decor/xtal-decor.js';
import {define} from 'xtal-element/XtalElement.js';

export interface FormExtensionData {
    originalAction: string;
    regExpArray: RegExpMatchArray;
}
//https://stackoverflow.com/a/43537400/3320028
export function splitPairs(str: String, lhsDelim: string, rhsDelim: string): string[]{
    const array: string[] = [];
    let c = 0;
    const regExp = new RegExp(`([${lhsDelim}${rhsDelim}])`, 'i');
    str.split(regExp).filter(Boolean).forEach(e =>
        // Increase / decrease counter and push desired values to an array
        e == '(' ? c++ : e == ')' ? c-- : c > 0 ? array.push('(' + e + ')') : array.push(e)
    );
    return array;
}
//const balBraces = /\{([^\]]+)}/g;
export class FormMatter extends XtalDecor {
    static is = 'form-matter';
    formMap = new WeakMap<HTMLFormElement, FormExtensionData>();
    on = {
        submit: ({self}: any, e: Event) => {
            console.log(e);
            e.preventDefault();
            const frm = e.target as HTMLFormElement;
            if(!this.formMap.has(frm)){
                const action = frm.action;
                //let regExpArray: RegExpMatchArray | null = null;
                if(action){
                    //regExpArray = action.match(balBraces);
                    const action2 = decodeURI(action);
                    const splitPairArr = splitPairs(action2, '{', '}');
                    debugger;
                }
                const formExtensionData = {
                    originalAction: action,
                    //regExpArray: regExpArray,
                } as FormExtensionData;
                this.formMap.set(frm, formExtensionData);
            }
            const frmExtData = this.formMap.get(frm)!;
            if(frmExtData.originalAction){

            }
            //frm.submit();
        }
    }
    actions = [];

    init = (h: HTMLElement) => {
        console.log('iah');
    }
}
define(FormMatter);

