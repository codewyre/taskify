import { JSX } from 'solid-js/jsx-runtime';
import { HeaderBarComponent } from '../../components/header-bar/header-bar.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';

export function PresentationComponent(): JSX.Element {
  return (<div>
    <HeaderBarComponent></HeaderBarComponent>
    <TodoListComponent></TodoListComponent>
  </div>);
}
