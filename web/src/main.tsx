import 'reflect-metadata';

import { render } from "solid-js/web";
import { Container, interfaces } from 'inversify';

import { DependencyInjectionContext } from './contexts/dependency-injection.context';
import { application } from './decorators/application.decorator';
import { AuthenticationService } from './services/authentication.service';
import { TodoService } from './services/todo.service';

import { PresentationComponent } from './views/presentation/presentation.component';

import './styles/global.scss';

@application()
class App {
  //#region Private Fields
  private _container: Container | null = null;
  //#endregion

  //#region Ctor
  public constructor() {

  }
  //#endregion

  public static async main(): Promise<void> {
    await new App()
      .buildContainer()
      .authorizeUser().then(app => app
      .render());
  }

  private async authorizeUser(): Promise<App> {
    await this._container?.get(AuthenticationService).initialize();
    return this;
  }

  private buildContainer(): App {
    const container = new Container();

    const services: interfaces.ServiceIdentifier[] = [
      AuthenticationService,
      TodoService
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
    render(
      () => <DependencyInjectionContext.Provider value={this._container}>
        <PresentationComponent />
      </DependencyInjectionContext.Provider>,
      document.getElementById("app")!);

    return this;
  }
}