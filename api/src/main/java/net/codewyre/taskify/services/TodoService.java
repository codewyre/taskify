package net.codewyre.taskify.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import net.codewyre.taskify.models.Todo;

@Service
public class TodoService {
  //#region Public Methods
  public List<Todo> getTodos() {
    var todos = new ArrayList<Todo>();

    var todo = new Todo();
    todo.Author = "Hobart";
    todo.Created = new Date();
    todo.LastModified = new Date();
    todo.Title = "Clean room";

    todos.add(todo);

    return todos;
  }
  //#endregion
}
