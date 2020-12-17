import {XtalDecor} from 'xtal-decor/xtal-decor.js';
import {define} from 'xtal-element/XtalElement.js';

export interface FormExtensionData {
    originalAction: string;
    decodedAction: string;
    splitPairArr: string[];
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
            e.preventDefault();
            const frm = e.target as HTMLFormElement;
            if(!this.formMap.has(frm)){
                const action = frm.action;
                const formExtensionData = {
                    originalAction: action,
                } as FormExtensionData;
                if(action){
                    const decodedAction = decodeURI(action);
                    const splitPairArr = splitPairs(decodedAction, '{', '}');
                    Object.assign(formExtensionData,{splitPairArr, decodedAction});
                }
                this.formMap.set(frm, formExtensionData);
            }
            const frmExtData = this.formMap.get(frm)!;
            if(frmExtData.originalAction){
                if(frmExtData.splitPairArr !== undefined){
                    const newArr: string[] = [];
                    let inBrace = false;
                    frmExtData.splitPairArr.forEach(token => {
                        console.log(token);
                        switch(token[0]){
                            case '{':
                                inBrace = true;
                                return;
                            case '}':
                                inBrace = false;
                                return;
                        }
                        if(inBrace){
                            const inputEl = frm.querySelector(`[name="${token}"]`) as HTMLInputElement | null;
                            if(inputEl !== null){
                                newArr.push(inputEl.value);
                            }
                        }else{
                            newArr.push(token);
                        }
                    });
                    frm.action = newArr.join('');
                    frm.submit();
                }
            }
        }
    }
    actions = [];

    init = (h: HTMLElement) => {
    }
}
define(FormMatter);

