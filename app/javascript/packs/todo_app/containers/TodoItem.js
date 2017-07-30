import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, createFragmentContainer } from 'react-relay'
import environment from '../relay/environment'

import TodoItemComponent from '../components/TodoItem'

import UpdateTodoItemMutation from '../mutations/UpdateTodoItemMutation'
import RemoveTodoItemMutation from '../mutations/RemoveTodoItemMutation'

class TodoItemContainer extends Component {
  static propTypes = {
    todoItem: PropTypes.shape({
      id: PropTypes.string.isRequired,
      todoList: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }

  _getNewRemoveTodoItemMutation = () => {
    const { todoItem } = this.props

    return new RemoveTodoItemMutation(environment, {
      input: {
        todoItemID: todoItem.id,
        todoListID: todoItem.todoList.id,
      },
    })
  }

  _getNewUpdateTodoItemMutation = ({ name, completed }) => {
    const { todoItem } = this.props

    return new UpdateTodoItemMutation(environment, {
      input: {
        todoItemID: todoItem.id,
        name,
        completed,
      },
    })
  }

  _handleCompletedChangeValue = (completed) => {
    const mutation = this._getNewUpdateTodoItemMutation({ completed })
    mutation.commit()
  }

  _handleRemovePress = () => {
    const mutation = this._getNewRemoveTodoItemMutation()
    mutation.commit()
  }

  render() {
    return (
      <TodoItemComponent
        {...this.props}
        onCompletedChangeValue={this._handleCompletedChangeValue}
        onRemovePress={this._handleRemovePress}
      />
    )
  }
}

export default createFragmentContainer(
  TodoItemContainer,
  graphql`
    fragment TodoItem_todoItem on TodoItem {
      id
      completed
      name
      todoList {
        id
      }
    }
  `,
)
