import { injectable } from 'inversify';

@injectable()
export class ThemeService {
  public selectTheme(name: string): void {
    const cssClasses = Array.from(document.body.classList);
    document.body.classList.remove(cssClasses.find(x =>
      x.startsWith('theme-')) as string);
    document.body.classList.add(`theme-${name}`);
  }
}