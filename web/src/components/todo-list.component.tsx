import { createResource, For } from 'solid-js';
import { useDependency } from '../contexts/dependency-injection.context';
import { TodoService } from '../services/todo.service';

export function TodoListComponent() {
  const todoService: TodoService = useDependency(TodoService);

  const [todos] = createResource(
    () => todoService.getMyTodos(),
    { initialValue: [] });

  return (<>
    <For each={todos()}>
      {todo => (
        <div>{todo.Title}</div>
      )}
    </For>
  </>);
}