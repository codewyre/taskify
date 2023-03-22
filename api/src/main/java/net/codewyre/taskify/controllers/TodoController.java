package net.codewyre.taskify.controllers;

import org.springframework.web.bind.annotation.RestController;

import net.codewyre.taskify.models.Todo;
import net.codewyre.taskify.services.TodoService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class TodoController {
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
  @GetMapping("/")
  @CrossOrigin(origins = "*")
  ResponseEntity<List<Todo>> getTodos() {
    this.logger.debug("Begin getTodos");
    var todos = this._todoService.getTodos();

    var response = ResponseEntity.ok(todos);
    this.logger.debug("End getTodos with response", response);
    return response;
  }
  //#endregion
}
