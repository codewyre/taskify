package net.codewyre.taskify.configuration;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.NamingBase;

public class LowerCamelCaseStrategy extends NamingBase {
  private static final long serialVersionUID = 2L;

  /**
   * @since 2.14
   */
  public final static LowerCamelCaseStrategy INSTANCE = new LowerCamelCaseStrategy();

  @Override
  public String translate(String input) {
    return input.substring(0, 1).toLowerCase() + input.substring(1);
  }
}
