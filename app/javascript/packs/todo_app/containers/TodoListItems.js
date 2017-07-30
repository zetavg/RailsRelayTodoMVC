import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, createPaginationContainer } from 'react-relay'
import environment from '../relay/environment'

import TodoListItemsComponent from '../components/TodoListItems'

import { registerTodoListTodoItemsConnectionName } from '../registrations/todoListTodoItemsConnectionNames'

import MarkAllTodoItemsMutation from '../mutations/MarkAllTodoItemsMutation'

class TodoListItemsContainer extends Component {
  static propTypes = {
    todoList: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }

  _getNewMarkAllTodoItemsMutation = ({ completed }) => {
    const { todoList } = this.props

    return new MarkAllTodoItemsMutation(environment, {
      input: {
        todoListID: todoList.id,
        completed,
      },
    })
  }

  _handleMarkAllCompletedChangeValue = (completed) => {
    const mutation = this._getNewMarkAllTodoItemsMutation({ completed })
    mutation.commit()
  }

  render() {
    return (
      <TodoListItemsComponent
        {...this.props}
        onMarkAllCompletedChangeValue={this._handleMarkAllCompletedChangeValue}
      />
    )
  }
}

export default createPaginationContainer(
  TodoListItemsContainer,
  graphql`
    fragment TodoListItems_todoList on TodoList {
      id
      todoItemsCount
      completedTodoItemsCount
      todoItems(
        first: $count
        after: $cursor
      ) @connection(key: "TodoListItems_todoItems") {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            ...TodoItem_todoItem
          }
        }
      }
    }
  `,
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.todoList && props.todoList.todoItems
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query TodoListItemsPaginationQuery(
        $count: Int!
        $cursor: String
      ) {
        viewer {
          todoList {
            ...TodoListItems_todoList
          }
        }
      }
    `,
  },
)

registerTodoListTodoItemsConnectionName('TodoListItems_todoItems')
