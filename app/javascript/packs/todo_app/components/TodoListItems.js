import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from '../containers/TodoItem'

export default class TodoListItems extends Component {
  static propTypes = {
    todoList: PropTypes.shape({
      todoItemsCount: PropTypes.number.isRequired,
      completedTodoItemsCount: PropTypes.number.isRequired,
      todoItems: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              id: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequired,
    }).isRequired,
    onMarkAllCompletedChangeValue: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      refreshing: false,
    }
  }

  _handleToggleAllChange = (e) => {
    this.props.onMarkAllCompletedChangeValue(e.target.checked)
  }

  render() {
    const { todoList } = this.props
    const { todoItems } = todoList

    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={this._handleToggleAllChange}
          checked={todoList.todoItemsCount === todoList.completedTodoItemsCount}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todoItems.edges.map(edge => <TodoItem key={edge.node.id} todoItem={edge.node} />)}
        </ul>
      </section>
    )
  }
}
