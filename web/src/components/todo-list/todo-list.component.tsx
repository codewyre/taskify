import { createResource, createSignal, For, JSX, Show } from 'solid-js';
import { useDependency } from '../../contexts/dependency-injection.context';
import { Checkbox } from '../../controls/checkbox/checkbox';
import { TextField } from '../../controls/text-field/text-field';
import { timeout } from '../../core/timeout';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';

export function TodoListComponent(): JSX.Element {
  const todoService: TodoService = useDependency(TodoService);

  const [addTaskText, setAddTaskText] = createSignal('');
  const [showCompletedTasks, setShowCompletedTasks] = createSignal(false);

  const [todos, { mutate: updateTodos }] = createResource(
    () => todoService.getMyTodos(false),
    { initialValue: [] });

  const [completedTasks, { mutate: updateCompletedTasks }] = createResource(
      () => todoService.getMyTodos(true),
      { initialValue: [] });

  async function moveToCompleted(task: Todo): Promise<void> {
    (task as any).$readded = true;
    updateCompletedTasks(prev => [
      task,
      ...prev
    ]);

    updateTodos(prev => removeById(prev, task));

    await timeout(300);
    delete (task as any).$readded;
  }

  function removeById(tasks: Todo[], task: Todo): Todo[] {
    const index = tasks.findIndex(x => x.id === task.id);
    if (index < 0) {
      return tasks;
    }

    const renewed = [...tasks];
    renewed.splice(index, 1);
    return renewed;
  }

  async function moveToOpen(task: Todo): Promise<void> {
    (task as any).$readded = true;
    updateTodos(prev => [
      task,
      ...prev
    ]);

    updateCompletedTasks(prev => removeById(prev, task));

    await timeout(300);
    delete (task as any).$readded;
  }

  async function createTodo(subject: string): Promise<void> {
    setAddTaskText(subject);

    const todo = await todoService.createTodo(subject);
    updateTodos(todos => [
      todo,
      ...todos
    ]);

    setAddTaskText('');
  }

  return (<div class="todo-list">
    <div>
      <Checkbox
        checked={showCompletedTasks()}
        onChanged={checked => setShowCompletedTasks(checked)}>
        Show completed tasks
      </Checkbox>
    </div>
    <div class="todo-list-items">
      <Show when={!showCompletedTasks() && !todos().length || !todos().length && !completedTasks().length}>
        <div class="done">
          Congrats! You have done everything that we know of. If you miss something, add it below this list.
        </div>
      </Show>
      <Show when={todos().length}>
        <For each={todos()}>
          {todo => (<TodoComponent
            todo={todo}
            wasHidden={todo.$readded}
            onCompletionChanged={() => moveToCompleted(todo)}></TodoComponent>)}
        </For>
      </Show>

      <Show when={showCompletedTasks() && completedTasks().length}>
        <For each={completedTasks()}>
          {todo => (<TodoComponent
            todo={todo}
            wasHidden={todo.$readded}
            onCompletionChanged={() => moveToOpen(todo)}></TodoComponent>)}
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