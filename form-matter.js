import { XtalDecor } from 'xtal-decor/xtal-decor.js';
import { define } from 'xtal-element/XtalElement.js';
//https://stackoverflow.com/a/43537400/3320028
export function splitPairs(str, lhsDelim, rhsDelim) {
    const array = [];
    let c = 0;
    const regExp = new RegExp(`([${lhsDelim}${rhsDelim}])`, 'i');
    str.split(regExp).filter(Boolean).forEach(e => 
    // Increase / decrease counter and push desired values to an array
    e == '(' ? c++ : e == ')' ? c-- : c > 0 ? array.push('(' + e + ')') : array.push(e));
    return array;
}
//const balBraces = /\{([^\]]+)}/g;
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
                    const action = frm.action;
                    //let regExpArray: RegExpMatchArray | null = null;
                    if (action) {
                        //regExpArray = action.match(balBraces);
                        const action2 = decodeURI(action);
                        const splitPairArr = splitPairs(action2, '{', '}');
                        debugger;
                    }
                    const formExtensionData = {
                        originalAction: action,
                    };
                    this.formMap.set(frm, formExtensionData);
                }
                const frmExtData = this.formMap.get(frm);
                if (frmExtData.originalAction) {
                }
                //frm.submit();
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
