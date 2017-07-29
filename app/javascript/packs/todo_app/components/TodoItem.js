import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoItem extends Component {
  static propTypes = {
    todoItem: PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { todoItem } = this.props

    return (
      <li className={todoItem.completed && 'completed'}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={todoItem.completed} readOnly />
          <label>{todoItem.name}</label>
          <button className="destroy" />
        </div>
        <input className="edit" value="" readOnly />
      </li>
    )
  }
}
