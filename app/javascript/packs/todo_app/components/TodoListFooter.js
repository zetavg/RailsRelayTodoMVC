import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoListFooter extends Component {
  static propTypes = {
    todoList: PropTypes.shape({
      activeTodoItemsCount: PropTypes.number.isRequired,
      completedTodoItemsCount: PropTypes.number.isRequired,
    }).isRequired,
    onClearCompletedPress: PropTypes.func.isRequired,
  }

  render() {
    const {
      todoList,
      onClearCompletedPress,
    } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{todoList.activeTodoItemsCount}</strong>&nbsp;
          {todoList.activeTodoItemsCount > 1 ? 'items' : 'item'} left
        </span>
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
        {(() => {
          if (todoList.completedTodoItemsCount > 0) {
            return (
              <button
                className="clear-completed"
                onClick={onClearCompletedPress}
              >
                Clear completed
              </button>
            )
          }
          return null
        })()}
      </footer>
    )
  }
}
