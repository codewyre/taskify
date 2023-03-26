import 'reflect-metadata';

import { render } from "solid-js/web";
import { Container, interfaces } from 'inversify';

import { DependencyInjectionContext } from './contexts/dependency-injection.context';
import { application } from './decorators/application.decorator';
import { AuthenticationService } from './services/authentication.service';
import { TodoService } from './services/todo.service';

import { PresentationComponent } from './views/presentation/presentation.component';

import './styles/global.scss';
import { ThemeService } from './services/theme.service';

@application()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class App {
  //#region Private Fields
  private _container: Container | null = null;
  //#endregion

  public static async main(): Promise<void> {
    await new App()
      .buildContainer()
      //.authorizeUser().then(app => app
      .render();
  }

  private async authorizeUser(): Promise<App> {
    await this._container?.get(AuthenticationService).initialize();
    return this;
  }

  private buildContainer(): App {
    const container = new Container();

    const services: interfaces.ServiceIdentifier[] = [
      AuthenticationService,
      TodoService,
      ThemeService
    ];

    for (const service of services) {
      container
        .bind(service)
        .toSelf()
        .inSingletonScope();
    }

    this._container = container;

    return this;
  }

  private render(): App {
    const appContainer = document.getElementById("app");
    if (!appContainer) {
      throw new Error('Could not find #app container element in DOM.');
    }

    render(
      () => <DependencyInjectionContext.Provider value={this._container}>
        <PresentationComponent />
      </DependencyInjectionContext.Provider>,
      appContainer);

    return this;
  }
}