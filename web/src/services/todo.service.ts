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

    const response = await fetch('http://localhost:8080/todo', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    return response.json();
  }

  public async markAs(id: string, checked: boolean): Promise<void> {
    const { jsonWebToken: jwt } = this._authenticationService;

    await fetch(`http://localhost:8080/todo/${id}/state`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(checked)
    });
  }


  public async createTodo(subject: string): Promise<Todo> {
    const { jsonWebToken: jwt } = this._authenticationService;

    const response = await fetch('http://localhost:8080/todo', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: subject,
        author: this._authenticationService.userId
      } as Omit<Todo, 'id'>)
    });

    return response.json();
  }
  //#endregion
}