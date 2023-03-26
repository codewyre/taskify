import { JSX } from 'solid-js/jsx-runtime';
import { ToggleSwitch } from '../../controls/toggle-switch/toggle-switch';

export function HeaderBarComponent(): JSX.Element {
  function updateTheme(dark: boolean): void {
    if (dark)
  }

  return (<div class="header-bar">
    <ToggleSwitch
      checked={true}
      onChanged={dark => updateTheme(dark)}>
      Use Dark Theme
    </ToggleSwitch>
  </div>);
}