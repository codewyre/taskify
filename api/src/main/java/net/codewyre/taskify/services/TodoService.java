package net.codewyre.taskify.services;

import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import net.codewyre.taskify.models.CreateTodoRequest;
import net.codewyre.taskify.models.Todo;
import net.codewyre.taskify.models.TodoEntity;

@Service
public class TodoService {
  private final TodoRepository _todoRepository;

  //#region Ctor
  public TodoService(TodoRepository repository) {
    this._todoRepository = repository;
  }
  //#endregion

  //#region Public Methods
  public List<Todo> getTodosForUser(String userId) throws
    InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException,
    NoSuchMethodException, SecurityException, SQLException {

    var entities = this._todoRepository.getTodosForUser(userId);

    return entities
      .stream()
      .map(entity -> this.toTodoEntity(entity))
      .toList();
  }

  public Todo createTodo(CreateTodoRequest payload, String userId) throws SQLException {
    var todoEntity = this._todoRepository.insertNewTodo(userId, payload.Title);
    return this.toTodoEntity(todoEntity);
  }
  //#endregion

  //#region Private Methods
  private Todo toTodoEntity(TodoEntity entity) {
    var todo = new Todo();
    todo.Author = entity.Author;
    todo.Created = new Date();
    todo.LastModified = new Date();
    todo.Title = entity.Title;
    return todo;
  }
  //#endregion
}
