import React, { Component } from 'react'
import TodoListHeader from './TodoListHeader'
import TodoListItems from './TodoListItems'
import TodoListFooter from './TodoListFooter'

export default class TodoApp extends Component {
  render() {
    return (
      <div className="todoapp-container">
        <section className="todoapp">
          <TodoListHeader />
          <TodoListItems />
          <TodoListFooter />
        </section>
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
