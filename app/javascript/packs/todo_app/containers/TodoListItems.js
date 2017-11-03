import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, createPaginationContainer } from 'react-relay'
import environment from '../relay/environment'

import TodoListItemsComponent from '../components/TodoListItems'

import { registerTodoListTodoItemsConnectionName } from '../registrations/todoListTodoItemsConnectionNames'

import MarkAllTodoItemsMutation from '../mutations/MarkAllTodoItemsMutation'

import TodoItemAddedSubscription from '../subscriptions/TodoItemAddedSubscription'
import TodoItemUpdatedSubscription from '../subscriptions/TodoItemUpdatedSubscription'
import TodoItemsUpdatedSubscription from '../subscriptions/TodoItemsUpdatedSubscription'
import TodoItemRemovedSubscription from '../subscriptions/TodoItemRemovedSubscription'
import TodoItemsRemovedSubscription from '../subscriptions/TodoItemsRemovedSubscription'

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

  componentWillMount() {
    const subscriptionParams = [environment, { variables: {
        todoListID: this.props.todoList.id,
      }
    }]
    this.todoItemAddedSubscription = new TodoItemAddedSubscription(...subscriptionParams)
    this.todoItemUpdatedSubscription = new TodoItemUpdatedSubscription(...subscriptionParams)
    this.todoItemsUpdatedSubscription = new TodoItemsUpdatedSubscription(...subscriptionParams)
    this.todoItemRemovedSubscription = new TodoItemRemovedSubscription(...subscriptionParams)
    this.todoItemsRemovedSubscription = new TodoItemsRemovedSubscription(...subscriptionParams)

    this.todoItemAddedSubscription.subscribe()
    this.todoItemUpdatedSubscription.subscribe()
    this.todoItemsUpdatedSubscription.subscribe()
    this.todoItemRemovedSubscription.subscribe()
    this.todoItemsRemovedSubscription.subscribe()
  }

  componentWillUnmount() {
    if (this.todoItemAddedSubscription) this.todoItemAddedSubscription.unsubscribe()
    if (this.todoItemUpdatedSubscription) this.todoItemUpdatedSubscription.unsubscribe()
    if (this.todoItemsUpdatedSubscription) this.todoItemsUpdatedSubscription.unsubscribe()
    if (this.todoItemRemovedSubscription) this.todoItemRemovedSubscription.unsubscribe()
    if (this.todoItemsRemovedSubscription) this.todoItemsRemovedSubscription.unsubscribe()
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
          cursor
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
        todoListID: props.todoList.id,
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query TodoListItemsPaginationQuery(
        $todoListID: ID
        $count: Int!
        $cursor: String
        $filter: TodoListTodoItemsFilterEnum
      ) {
        viewer {
          todoList(id: $todoListID) {
            ...TodoListItems_todoList
          }
        }
      }
    `,
  },
)

registerTodoListTodoItemsConnectionName('TodoListItems_todoItems')
