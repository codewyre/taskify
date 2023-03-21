package net.codewyre.taskify.controllers;

import org.springframework.web.bind.annotation.RestController;

import net.codewyre.taskify.models.Todo;
import net.codewyre.taskify.services.TodoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class TodoController {
  //#region Private Fields
  private final TodoService _todoService;
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
  ResponseEntity<List<Todo>> home() {
    var todos = this._todoService.getTodos();

    return ResponseEntity.ok(todos);
  }
  //#endregion
}
