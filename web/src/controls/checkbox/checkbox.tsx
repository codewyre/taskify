import { createSignal } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

export interface CheckboxProps {
  children?: JSX.Element | JSX.Element[];
  checked?: boolean;
  onChanged?: (checked: boolean) => void;
}

export function Checkbox(props: CheckboxProps): JSX.Element {
  const [checked, setChecked] = createSignal(props.checked);

  function toggle(): void {
    const newState = !checked();

    setChecked(newState);

    if (props.onChanged) {
      props.onChanged(newState);
    }
  }

  return (<div class="checkbox">
    <div class="checkbox__frame" onClick={() => toggle()}>
      <div classList={{
        "checkbox__frame__toggle": true,
        "checkbox__frame__toggle--active": checked(),
      }}></div>
    </div>
    <div class="content">
      {props.children}
    </div>
  </div>);
}