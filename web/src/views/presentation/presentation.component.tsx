import { createSignal, For } from 'solid-js';
import { useDependency } from '../../contexts/dependency-injection.context';
import { AuthenticationService } from '../../services/authentication.service';

export function PresentationComponent() {
  const authenticationService: AuthenticationService = useDependency(AuthenticationService)

  const [todos, setTodos] = createSignal([] as { Title: string }[]);

  async function initialize() {
    const response = await fetch('http://localhost:8080/', {
      headers: {
        Authorization: `Bearer ${authenticationService.jsonWebToken}`
      }
    });

    setTodos(await response.json());
  }

  return (<div>
    <For each={todos()}>
      {todo => (
        <div>{todo.Title}</div>
      )}
    </For>
  </div>);
}
