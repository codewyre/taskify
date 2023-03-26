package net.codewyre.taskify.models;

import java.util.Date;

import net.codewyre.taskify.annotations.Column;

public class TodoEntity {
  @Column(name="id")
  public String Id;

  @Column(name="subject")
  public String Title;

  @Column(name="created")
  public Date Created;

  @Column(name="lastModified")
  public Date LastModified;

  @Column(name="author")
  public String Author;

  @Column(name="state")
  public Boolean State;

}
