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
    relay: PropTypes.shape({
      hasMore: PropTypes.func.isRequired,
      isLoading: PropTypes.func.isRequired,
      loadMore: PropTypes.func.isRequired,
      refetchConnection: PropTypes.func.isRequired,
    }).isRequired,
  }

  setFilter = (filter) => {
    this.props.relay.refetch({ filter })
  }

  loadMore = (callback) => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) return
    this.props.relay.loadMore(10, callback)
  }

  refreshLayout = () => {
    if (
      this.component &&
      this.component.refreshLayout
    ) {
      setTimeout(this.component.refreshLayout, 10)
    }
  }

  refresh = () => {
    if (this.props.relay.isLoading()) return
    this.setState({ refreshing: true })
    this.props.relay.refetchConnection(10, () => {
      this.setState({ refreshing: false })
    })
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

  _handleLoadMoreTriggered = (callbackIfHasMore) => {
    this.loadMore(() => {
      if (this.props.relay.hasMore()) callbackIfHasMore()
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
        ref={ref => this.component = ref}
        onMarkAllCompletedChangeValue={this._handleMarkAllCompletedChangeValue}
        onLoadMoreTriggered={this._handleLoadMoreTriggered}
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
        filter: $filter
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
        $filter: TodoListTodoItemsFilterEnum
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
