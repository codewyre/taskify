export function application(): Function {
  return (constructor: Function) => {
    setTimeout(() => (constructor as any).main());
    return constructor;
  }
}