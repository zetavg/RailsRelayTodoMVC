import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ENTER_KEY_CODE = 13

export default class TodoItem extends Component {
  static propTypes = {
    todoItem: PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    onCompletedChangeValue: PropTypes.func.isRequired,
    editNameValue: PropTypes.string.isRequired,
    onEditNameChangeText: PropTypes.func.isRequired,
    onSubmitNameEditing: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
  }

  state = {
    editing: false,
  }

  _handleToggleChange = (e) => {
    this.props.onCompletedChangeValue(e.target.checked)
  }

  _handleLabelDoubleClick = () => {
    this.setState({ editing: true }, () => {
      this.editNameInput.focus()
      const l = this.editNameInput.value.length
      this.editNameInput.setSelectionRange(l, l)
    })
  }

  _handleEditNameChange = (e) => {
    this.props.onEditNameChangeText(e.target.value)
  }

  _handleEditNameKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.props.onSubmitNameEditing()
      this.setState({ editing: false })
    }
  }

  _handleEditNameBlur = () => {
    this.props.onSubmitNameEditing()
    this.setState({ editing: false })
  }

  render() {
    const {
      todoItem,
      editNameValue,
      onRemovePress,
    } = this.props
    const { editing } = this.state

    return (
      <li
        className={[
          todoItem.completed && 'completed',
          editing && 'editing',
        ].filter(el => el).join(' ')}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={this._handleToggleChange}
            checked={todoItem.completed}
          />
          <label
            onDoubleClick={this._handleLabelDoubleClick}
          >
            {todoItem.name}
          </label>
          <button
            className="destroy"
            onClick={onRemovePress}
          />
        </div>
        <input
          ref={ref => this.editNameInput = ref}
          className="edit"
          onChange={this._handleEditNameChange}
          onKeyDown={this._handleEditNameKeyDown}
          onBlur={this._handleEditNameBlur}
          value={editNameValue}
        />
      </li>
    )
  }
}
