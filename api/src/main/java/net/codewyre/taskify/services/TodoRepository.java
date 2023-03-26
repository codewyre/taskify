package net.codewyre.taskify.services;

import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.Collection;
import java.util.UUID;

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
      MessageFormat.format(
        """
          SELECT
            *
          FROM
            todos
          WHERE
            `author` = ''{0}'';
        """,
        this.escape(userId)),
      TodoEntity.class);
  }

  public TodoEntity insertNewTodo(String userId, String title) throws SQLException {

    var entity = new TodoEntity();
    entity.Id = UUID.randomUUID().toString();
    entity.Title = title;
    entity.Author = userId;

    this.execute(MessageFormat.format(
      """
        INSERT INTO
          todos (
            `id`,
            `subject`,
            `author`,
            `created`,
            `lastModified`,
            `state`,
            `description`)
        VALUES (''{0}'', ''{1}'', ''{2}'', NOW(), NOW(), 0, '''');
      """,
      this.escape(entity.Id),
      this.escape(entity.Title),
      this.escape(entity.Author)));

    return entity;
  }

  public void updateTodoState(String id, boolean state) throws SQLException {

    this.execute(MessageFormat.format(
      """
        UPDATE
          todos
        SET
          `state` = {1}
        WHERE
          `id` = ''{0}'';
      """,
      this.escape(id),
      this.escape(state ? "true" : "false")));
  }
}
