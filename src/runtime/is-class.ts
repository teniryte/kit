export function isClass(Class: any) {
  if (typeof Class !== 'function') {
    return false;
  }
  if (/^class\s/.test(Function.prototype.toString.call(Class))) {
    return true;
  }
  try {
    new Class();
    return /^[A-Z]/gm.test(Class.name);
  } catch (err: any) {
    return !err.message.includes('is not a constructor');
  }
}

export default isClass;
