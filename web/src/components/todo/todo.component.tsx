import { createSignal, JSX } from 'solid-js';
import { useDependency } from '../../contexts/dependency-injection.context';
import { Checkbox } from '../../controls/checkbox/checkbox';
import { timeout } from '../../core/timeout';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

export interface TodoProps {
  todo: Todo;

  wasHidden?: boolean;
  onCompletionChanged?: () => void;
}

export function TodoComponent(props: TodoProps): JSX.Element {
  const todoService = useDependency<TodoService>(TodoService);

  const [hidden, setHidden] = createSignal(props.wasHidden);
  if (props.wasHidden) {
    timeout(300).then(() => setHidden(!hidden));
  }

  async function toggle(checked: boolean): Promise<void> {
    await todoService.markAs(props.todo.id, checked);
    props.todo.state = checked;

    setHidden(!hidden());

    if (props.onCompletionChanged) {
      await timeout(300);
      props.onCompletionChanged();
    }
  }

  return (<div classList={{
    "todo-list-items__entry": true,
    "todo-list-items__entry--hidden": hidden(),
    "todo-list-items__entry--done": props.todo.state
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