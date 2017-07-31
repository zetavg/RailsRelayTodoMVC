import React, { Component } from 'react'
import TodoListCard from './TodoListCard'

export default class TodoApp extends Component {
  render() {
    return (
      <div className="todo-list-card-container">
        <TodoListCard />
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
          <p>Created by <a href="http://github.com/zetavg">@zetavg</a></p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </div>
    )
  }
}
