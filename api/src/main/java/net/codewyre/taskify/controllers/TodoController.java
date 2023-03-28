package net.codewyre.taskify.controllers;

import org.springframework.web.bind.annotation.RestController;

import net.codewyre.taskify.models.CreateTodoRequest;
import net.codewyre.taskify.models.Todo;
import net.codewyre.taskify.services.TodoService;

import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class TodoController extends KeycloakSecuredController {
  //#region Private Fields
  private final TodoService _todoService;
  public Logger logger = LoggerFactory.getLogger(TodoController.class);
  //#endregion

  //#region Ctor
  @Autowired
  public TodoController(TodoService todoService) {
    this._todoService = todoService;
  }
  //#endregion

  //#region Public Methods
  @GetMapping("/todo")
  @CrossOrigin(origins = "*")
  @PreAuthorize("isFullyAuthenticated()")
  ResponseEntity<List<Todo>> getTodos(@RequestParam(required = false, value = "done") Boolean done) throws
    InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException,
    NoSuchMethodException, SecurityException, SQLException {

    if (done == null) {
      done = false;
    }

    this.logger.info("Begin getTodos for " + this.getUserId());
    var todos = this._todoService.getTodosForUser(this.getUserId(), done);

    var response = ResponseEntity.ok(todos);
    this.logger.info("End getTodos with response", response);
    return response;
  }

  @PostMapping("/todo")
  @CrossOrigin(origins = "*")
  @PreAuthorize("isFullyAuthenticated()")
  ResponseEntity<Todo> createTodo(@RequestBody CreateTodoRequest payload) throws
    InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException,
    NoSuchMethodException, SecurityException, SQLException {

    this.logger.info("Begin createTodo for " + this.getUserId());
    var todo = this._todoService.createTodo(payload, this.getUserId());

    var response = ResponseEntity.ok(todo);
    this.logger.info("End createTodo with response", response);
    return response;
  }

  @PutMapping("/todo/{id}/state")
  @CrossOrigin(origins = "*")
  @PreAuthorize("isFullyAuthenticated()")
  void updateTodoState(
    @RequestBody boolean state,
    @PathVariable("id") String id) throws SQLException {

    this.logger.info("Begin updateTodoState for " + this.getUserId());
    this._todoService.updateTodoState(id, state);

    var response = ResponseEntity.noContent();
    this.logger.info("End updateTodoState with response", response);
  }
  //#endregion
}
