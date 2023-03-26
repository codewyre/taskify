import { JSX } from 'solid-js';

export interface TextFieldProps {
  children?: (submit: () => void) => JSX.Element | JSX.Element[];
  placeholder?: string;
  text?: string;
  onSubmit?: (text: string) => void
}

export function TextField(props: TextFieldProps): JSX.Element {
  let inputControl: HTMLInputElement;

  function processSubmit(): void {
    props.onSubmit && props.onSubmit(inputControl?.value);
  }

  return <div
    class="input-field"
    tabindex="0">
    <input
      type="text"
      placeholder={props.placeholder}
      onKeyUp={e => e.code.endsWith('Enter') && processSubmit()}
      class="input-field__control"
      ref={val => inputControl = val}
      value={props.text}/>
    <div class="input-field__action">
      {props.children && props.children(() => processSubmit())}
    </div>
  </div>;
}