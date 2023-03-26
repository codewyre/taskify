import { createSignal, JSX } from 'solid-js';
import { useDependency } from '../../contexts/dependency-injection.context';
import { Checkbox } from '../../controls/checkbox/checkbox';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

export interface TodoProps {
  todo: Todo;
}

export function TodoComponent(props: TodoProps): JSX.Element {
  const todoService = useDependency<TodoService>(TodoService);

  const [hidden, setHidden] = createSignal(false);

  async function toggle(checked: boolean): Promise<void> {
    await todoService.markAs(props.todo.id, checked);
    setHidden(checked);
  }

  return (<div classList={{
    "todo-list-items__entry": true,
    "todo-list-items__entry--hidden": hidden()
  }}>
    <div>
      <Checkbox
        checked={props.todo.state}
        onChanged={checked => toggle(checked)}></Checkbox>
    </div>
    <div>{props.todo.title}</div>
    <div>{props.todo.author}</div>
  </div>);
}