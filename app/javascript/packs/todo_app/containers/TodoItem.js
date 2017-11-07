/* @flow */

import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import type { DataID } from 'react-relay'
import environment from '../relay/environment'

import TodoItemComponent from '../components/TodoItem'

import UpdateTodoItemMutation from '../mutations/UpdateTodoItemMutation'
import RemoveTodoItemMutation from '../mutations/RemoveTodoItemMutation'

type Props = {|
  todoItem: {
    id: DataID,
    name: string,
    todoList: {
      id: DataID,
    },
  },
|};

type State = {
  updateNameMutation: UpdateTodoItemMutation,
};

class TodoItemContainer extends Component<Props, State> {
  constructor(props, context) {
    super(props, context)

    const { name } = props.todoItem
    this.state = {
      updateNameMutation: this._getNewUpdateTodoItemMutation({ name }),
    }
  }

  _getNewUpdateTodoItemMutation = (input) => {
    const { todoItem } = this.props

    return new UpdateTodoItemMutation(environment, {
      todoItemID: todoItem.id,
      ...input,
    })
  }

  _handleCompletedChangeValue = (completed) => {
    const mutation = this._getNewUpdateTodoItemMutation({ completed })
    mutation.commit()
  }

  _handleEditNameChangeText = (name) => {
    const { updateNameMutation } = this.state
    this.setState({ updateNameMutation: UpdateTodoItemMutation.updateInput(updateNameMutation, { name }) })
  }

  _handleSubmitNameEditing = () => {
    const { updateNameMutation } = this.state

    if (updateNameMutation.isValid) {
      updateNameMutation.commit()
    } else {
      this.setState({
        updateNameMutation: UpdateTodoItemMutation.updateInput(updateNameMutation, { name: this.props.todoItem.name }),
      })
    }
  }

  _getNewRemoveTodoItemMutation = () => {
    const { todoItem } = this.props

    return new RemoveTodoItemMutation(environment, {
      todoItemID: todoItem.id,
      todoListID: todoItem.todoList && todoItem.todoList.id,
    })
  }

  _handleRemovePress = () => {
    const mutation = this._getNewRemoveTodoItemMutation()
    mutation.commit()
  }

  render() {
    const { updateNameMutation } = this.state

    return (
      <TodoItemComponent
        {...this.props}
        onCompletedChangeValue={this._handleCompletedChangeValue}
        editNameValue={updateNameMutation.input.name}
        onEditNameChangeText={this._handleEditNameChangeText}
        onSubmitNameEditing={this._handleSubmitNameEditing}
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
