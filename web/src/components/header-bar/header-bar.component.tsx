import { JSX } from 'solid-js/jsx-runtime';
import { useDependency } from '../../contexts/dependency-injection.context';
import { ToggleSwitch } from '../../controls/toggle-switch/toggle-switch';
import { ThemeService } from '../../services/theme.service';

export function HeaderBarComponent(): JSX.Element {
  const themeService = useDependency<ThemeService>(ThemeService);

  function updateTheme(dark: boolean): void {
    if (dark) {
      themeService.selectTheme('default-dark');
    } else {
      themeService.selectTheme('default-light');
    }
  }

  return (<div class="header-bar">
    <ToggleSwitch
      checked={true}
      onChanged={dark => updateTheme(dark)}>
      Use Dark Theme
    </ToggleSwitch>
  </div>);
}