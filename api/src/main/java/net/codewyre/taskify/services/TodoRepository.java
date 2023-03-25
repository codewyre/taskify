package net.codewyre.taskify.services;

import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.Collection;

import org.springframework.stereotype.Service;

import net.codewyre.taskify.models.TodoEntity;

@Service
public class TodoRepository extends RepositoryBase {
  public TodoRepository() throws SQLException {
    super();
  }

  public Collection<TodoEntity> getTodosForUser(String userId) throws
    SQLException, InstantiationException, IllegalAccessException,
    IllegalArgumentException, InvocationTargetException, NoSuchMethodException,
    SecurityException {

    return this.queryEntities(
      """
        SELECT `id`, `subject`, `author`
        FROM todos
        WHERE `author` = '""" + this.escape(userId) + "'", TodoEntity.class);
  }
}
