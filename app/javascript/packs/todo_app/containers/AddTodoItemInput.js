/* @flow */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, createFragmentContainer } from 'react-relay'
import type { DataID } from 'react-relay'
import environment from '../relay/environment'

import AddTodoItemInputComponent from '../components/AddTodoItemInput'

import AddTodoItemMutation from '../mutations/AddTodoItemMutation'

type Props = {|
  todoList: {
    id: DataID,
  },
|};

type State = {
  mutation: AddTodoItemMutation,
};

class AddTodoItemInputContainer extends Component<Props, State> {
  static propTypes = {
    todoList: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      mutation: this._getNewMutation(),
    }
  }

  _getNewMutation = () => {
    const { todoList } = this.props

    return new AddTodoItemMutation(environment, {
      todoListID: todoList.id,
    })
  }

  _handleTodoItemNameChange = (todoItemName) => {
    const { mutation } = this.state
    this.setState({
      mutation: AddTodoItemMutation.updateInput(mutation, { name: todoItemName }),
    })
  }

  _handleSubmitEditing = () => {
    const { mutation } = this.state
    mutation.commit()
    this.setState({ mutation: this._getNewMutation() })
  }

  render() {
    const { mutation } = this.state

    return (
      <AddTodoItemInputComponent
        todoItemNameValue={mutation.input.name}
        onChangeTodoItemName={this._handleTodoItemNameChange}
        onSubmitEditing={this._handleSubmitEditing}
      />
    )
  }
}

export default createFragmentContainer(
  AddTodoItemInputContainer,
  graphql`
    fragment AddTodoItemInput_todoList on TodoList {
      id
    }
  `,
)
