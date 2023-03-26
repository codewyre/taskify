import { createResource, createSignal, For, JSX, Show } from 'solid-js';
import { useDependency } from '../../contexts/dependency-injection.context';
import { Checkbox } from '../../controls/checkbox/checkbox';
import { TextField } from '../../controls/text-field/text-field';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';

export function TodoListComponent(): JSX.Element {
  const todoService: TodoService = useDependency(TodoService);

  const [addTaskText, setAddTaskText] = createSignal('');
  const [todos, { mutate: updateTodos }] = createResource(
    () => todoService.getMyTodos(),
    { initialValue: [] });

  async function createTodo(subject: string): Promise<void> {
    setAddTaskText(subject);

    const todo = await todoService.createTodo(subject);
    updateTodos(todos => [
      ...todos,
      todo
    ]);

    setAddTaskText('');
  }

  return (<div class="todo-list">
    <div class="todo-list-items">
      <Show when={!todos().length}>
        <div class="done">
          Congrats! You have done everything that we know of. If you miss something, add it below this list.
        </div>
      </Show>
      <Show when={todos().length}>
        <For each={todos()}>
          {todo => (<TodoComponent todo={todo}></TodoComponent>)}
        </For>
      </Show>
    </div>
    <div classList={{
      "todo-list__add-new": true
    }}>
      <TextField
        placeholder="Add task..."
        text={addTaskText()}
        onSubmit={(text) => createTodo(text)}>
        { submit => (
          <span onClick={() => submit()}>
            ➡
          </span>)}
      </TextField>
    </div>
  </div>);
}