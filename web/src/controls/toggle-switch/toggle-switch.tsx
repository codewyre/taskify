import { createSignal } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

export interface ToggleSwitchProps {
  children: JSX.Element | JSX.Element[];
  checked?: boolean;
  onChanged?: (checked: boolean) => void;
}

export function ToggleSwitch(props: ToggleSwitchProps): JSX.Element {
  const [checked, setChecked] = createSignal(props.checked || false);

  function toggle(): void {
    const newState = !checked();

    setChecked(newState);

    if (props.onChanged) {
      props.onChanged(newState);
    }
  }

  return (<div class="toggle-switch">
    <div class="toggle-switch__frame" onClick={() => toggle()}>
      <div classList={{
        "toggle-switch__frame__toggle": true,
        "toggle-switch__frame__toggle--active": checked(),
      }}></div>
    </div>
    <div>{props.children}</div>
  </div>);
}