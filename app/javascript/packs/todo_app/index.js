import React, { Component } from 'react'
import TodoListHeader from './TodoListHeader'
import TodoListItems from './TodoListItems'

export default class TodoApp extends Component {
  render() {
    return (
      <div className="todoapp-container">
        <section className="todoapp">
          <TodoListHeader />
          <TodoListItems />
          <footer className="footer">
            <span className="todo-count"><strong>0</strong> item left</span>
            <ul className="filters">
              <li>
                <a className="selected" href="#/">All</a>
              </li>
              <li>
                <a href="#/active">Active</a>
              </li>
              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
          </footer>
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
