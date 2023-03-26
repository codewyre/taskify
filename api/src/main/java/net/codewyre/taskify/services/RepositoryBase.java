package net.codewyre.taskify.services;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.codewyre.taskify.annotations.Column;

public class RepositoryBase {
  private final Connection _connection;
  public Logger logger = LoggerFactory.getLogger(RepositoryBase.class);

  //#region Ctor
  public RepositoryBase() throws SQLException {
    this._connection = DriverManager.getConnection("jdbc:mariadb://localhost:3336/taskify", "root", "root");
  }
  //#endregion

  //#region Private Methods
  protected String escape(String variableValue) {
    // TODO: Implement Anti-SQL-Injection mechanism here.
    return variableValue;
  }

  protected void execute(String query) throws SQLException {
    try (PreparedStatement statement = this._connection.prepareStatement(query)) {
      statement.execute();
    }
  }

  protected <T> Collection<T> queryEntities(String query, Class<T> targetClass) throws
    SQLException, InstantiationException, IllegalAccessException, IllegalArgumentException,
    InvocationTargetException, NoSuchMethodException, SecurityException {

    this.logger.info("[SQL] Planning to execute " + query);

    var results = new ArrayList<T>();
    try (PreparedStatement statement = this._connection.prepareStatement(query)) {
      ResultSet resultSet = statement.executeQuery();

      while (resultSet.next()) {
        T targetObject = targetClass
          .getConstructor()
          .newInstance();

        var fields = Arrays.asList(targetClass.getDeclaredFields());
        for(Field field: fields) {
          Column col = field.getAnnotation(Column.class);
          if (col == null) {
            continue;
          }

          String name = col.name();
          try{
            String value = resultSet.getString(name);
            if (field.getType() == Boolean.class) {
              field.set(
                targetObject,
                value.equals("b'1'") ? true : false);
            } else {
              field.set(
                targetObject,
                field
                  .getType()
                  .getConstructor(String.class)
                  .newInstance(value));
            }
          } catch (Exception e) { }
        }

        results.add(targetObject);
      }
    }

    return results;
  }
  //#endregion
}
