import { Kind } from '../index';
import argsNames from './args-names';
import kindOf from './kind-of';

export const debugString = (val: any): string => {
  if (kindOf(val) === Kind.Error) {
    return val.stack;
  }

  if (kindOf(val) === Kind.Undefined) return 'undefined';

  if (kindOf(val) === Kind.Null) return 'null';

  if (kindOf(val) === Kind.Symbol) return val.toString();

  if (kindOf(val) === Kind.String) return val;

  if (kindOf(val) === Kind.Class) return `[class ${val.name}]`;

  if (kindOf(val) === Kind.Function)
    return `[function ${val.name}(${argsNames(val).join(', ')})]`;

  if (kindOf(val) === Kind.NaN) return 'NaN';

  if (kindOf(val) === Kind.Array) {
    return `[${val.map((v: any) => debugString(v)).join(', ')}]`;
  }

  if (kindOf(val) === Kind.Element) {
    const id = val.getAttribute('id');
    const className = val.getAttribute('class');
    const attrs = `${val.tagName.toLowerCase()}${id ? ` id="${id}"` : ''}${
      className ? ` class="${className}"` : ''
    }`;
    let html = val.innerHTML?.trim();
    if (!html) {
      return val.outerHTML;
    }
    if (html.length > 30) {
      html = `${html.slice(0, 30)}...`;
    }
    return `<${attrs}>${html}</${val.tagName.toLowerCase()}>`;
  }

  if (typeof NodeList === 'function' && val instanceof NodeList) {
    return debugString([...val]);
  }

  try {
    const s = JSON.stringify(val, null, 2);
    if (s === '{}') {
      return val.toString();
    } else {
      return s;
    }
  } catch (err) {
    return val?.toString();
  }
};

export default debugString;
