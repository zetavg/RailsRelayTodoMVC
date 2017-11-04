import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, createFragmentContainer } from 'react-relay'
import environment from '../relay/environment'

import TodoListFooterComponent from '../components/TodoListFooter'

import ClearCompletedTodoItemsMutation from '../mutations/ClearCompletedTodoItemsMutation'

class TodoListFooterContainer extends Component {
  static propTypes = {
    todoList: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }

  _getNewMutation = () => {
    const { todoList } = this.props

    return new ClearCompletedTodoItemsMutation(environment, {
      todoListID: todoList.id,
    })
  }

  _handleClearCompletedPress = () => {
    const mutation = this._getNewMutation()
    mutation.commit()
  }

  render() {
    const { todoList } = this.props

    return (
      <TodoListFooterComponent
        todoList={todoList}
        onClearCompletedPress={this._handleClearCompletedPress}
      />
    )
  }
}

export default createFragmentContainer(
  TodoListFooterContainer,
  graphql`
    fragment TodoListFooter_todoList on TodoList {
      id
      activeTodoItemsCount
      completedTodoItemsCount
    }
  `,
)
