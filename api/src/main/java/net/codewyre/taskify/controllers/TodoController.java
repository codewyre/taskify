package net.codewyre.taskify.controllers;

import org.springframework.web.bind.annotation.RestController;

import net.codewyre.taskify.models.Todo;
import net.codewyre.taskify.services.TodoService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

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
  @GetMapping("/")
  @CrossOrigin(origins = "*")
  @PreAuthorize("isFullyAuthenticated()")
  ResponseEntity<List<Todo>> getTodos() {
    this.logger.info("Begin getTodos for " + this.getUserId());
    var todos = this._todoService.getTodos();

    var response = ResponseEntity.ok(todos);
    this.logger.info("End getTodos with response", response);
    return response;
  }
  //#endregion
}
