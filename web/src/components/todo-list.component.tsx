import { createResource, For } from 'solid-js';
import { useDependency } from '../contexts/dependency-injection.context';
import { TodoService } from '../services/todo.service';

export function TodoListComponent() {
  const todoService: TodoService = useDependency(TodoService);

  const [todos] = createResource(
    () => todoService.getMyTodos(),
    { initialValue: [] });

  return (<div class="todo-list">
    <div>
      <h1>Open Todos:</h1>
    </div>
    <div class="todo-list-items">
      <For each={todos()}>
        {todo => (
          <div class="todo-list-items__entry">
            <div>
              <div class="checkbox">
                <input type="checkbox" />
              </div>
            </div>
            <div>{todo.title}</div>
            <div>{todo.author}</div>
          </div>
        )}
      </For>
    </div>
  </div>);
}