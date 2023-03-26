export function application(): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return  <TFunction extends Function>(constructor: TFunction) => {
    setTimeout(() => (constructor as any).main());
    return constructor;
  };
}