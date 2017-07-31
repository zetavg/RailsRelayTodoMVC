import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoListItems from '../containers/TodoListItems'

export default class TodoListItemsWithFilter extends Component {
  static propTypes = {
    todoList: PropTypes.shape({}).isRequired,
    filterValue: PropTypes.string.isRequired,
    onFilterPress: PropTypes.func.isRequired,
  }

  render() {
    const {
      todoList,
      filterValue,
      onFilterPress,
    } = this.props

    return (
      <div className="items-with-filter">
        <TodoListItems todoList={todoList} />
        <ul className="filters">
          <li>
            <button
              className={filterValue === 'all' && 'selected'}
              onClick={() => onFilterPress('all')}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={filterValue === 'active' && 'selected'}
              onClick={() => onFilterPress('active')}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={filterValue === 'completed' && 'selected'}
              onClick={() => onFilterPress('completed')}
            >
              Completed
            </button>
          </li>
        </ul>
      </div>
    )
  }
}
