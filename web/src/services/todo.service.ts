import { inject, injectable } from 'inversify';
import { Todo } from '../models/todo.model';
import { AuthenticationService } from './authentication.service';

@injectable()
export class TodoService {
  //#region Ctor
  public constructor(
    @inject(AuthenticationService)
    private readonly _authenticationService: AuthenticationService) { }
  //#endregion

  //#region Public Methods
  public async getMyTodos(): Promise<Todo[]> {
    const { jsonWebToken: jwt } = this._authenticationService;

    const response = await fetch('http://localhost:8080/', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    return response.json();
  }
  //#endregion
}