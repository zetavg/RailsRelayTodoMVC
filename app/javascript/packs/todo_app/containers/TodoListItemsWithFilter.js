import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, createRefetchContainer } from 'react-relay'

import TodoListItemsWithFilterComponent from '../components/TodoListItemsWithFilter'

class TodoListItemsWithFilterContainer extends Component {
  static propTypes = {
    todoList: PropTypes.shape({}).isRequired,
    relay: PropTypes.shape({
      refetch: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      filter: 'all',
    }
  }

  setFilter = (filter, callback) => {
    this.props.relay.refetch({ filter }, null, callback, { force: false })
    this.setState({ filter })
  }

  _handleFilterPress = (filter) => {
    this.setFilter(filter, () => {
      if (
        this.todoListItems &&
        this.todoListItems.refreshLayout
      ) {
        this.todoListItems.refreshLayout()
      }
    })
  }

  render() {
    const { todoList } = this.props
    const { filter } = this.state

    return (
      <TodoListItemsWithFilterComponent
        todoListItemsRef={ref => this.todoListItems = ref}
        todoList={todoList}
        filterValue={filter}
        onFilterPress={this._handleFilterPress}
      />
    )
  }
}

export default createRefetchContainer(
  TodoListItemsWithFilterContainer,
  graphql.experimental`
    fragment TodoListItemsWithFilter_todoList on TodoList
    @argumentDefinitions(
      filter: { type: "TodoListTodoItemsFilterEnum", defaultValue: "all" }
      count: { type: "Int", defaultValue: 10 }
    ) {
      ...TodoListItems_todoList
    }
  `,
  graphql.experimental`
    query TodoListItemsWithFilterRefetchQuery(
      $todoListID: ID
      $filter: TodoListTodoItemsFilterEnum!
      $count: Int!
      $cursor: String
    ) {
      viewer {
        todoList(id: $todoListID) {
          ...TodoListItemsWithFilter_todoList
        }
      }
    }
  `,
)
