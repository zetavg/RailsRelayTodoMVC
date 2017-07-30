import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoItem extends Component {
  static propTypes = {
    todoItem: PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    onCompletedChangeValue: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
  }

  _handleToggleChange = (e) => {
    this.props.onCompletedChangeValue(e.target.checked)
  }

  render() {
    const {
      todoItem, onRemovePress,
    } = this.props

    return (
      <li className={todoItem.completed && 'completed'}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={this._handleToggleChange}
            checked={todoItem.completed}
          />
          <label>{todoItem.name}</label>
          <button
            className="destroy"
            onClick={onRemovePress}
          />
        </div>
        <input className="edit" value="" readOnly />
      </li>
    )
  }
}
