import { HeaderBarComponent } from '../../components/header-bar/header-bar.component';
import { TodoListComponent } from '../../components/todo-list.component';

export function PresentationComponent() {
  return (<div>
    <HeaderBarComponent></HeaderBarComponent>
    <TodoListComponent></TodoListComponent>
  </div>);
}
