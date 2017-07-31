import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, createRefetchContainer } from 'react-relay'
import environment from '../relay/environment'

import TodoListItemsWithFilterComponent from '../components/TodoListItemsWithFilter'

class TodoListItemsWithFilterContainer extends Component {
  static propTypes = {
    todoList: PropTypes.shape({}),
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

  setFilter = (filter) => {
    this.props.relay.refetch({ filter })
    this.setState({ filter })
  }

  _handleFilterPress = (filter) => {
    this.setFilter(filter)
  }

  render() {
    const { todoList } = this.props
    const { filter } = this.state

    return (
      <TodoListItemsWithFilterComponent
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
      $filter: TodoListTodoItemsFilterEnum!
      $count: Int!
      $cursor: String
    ) {
      viewer {
        todoList {
          ...TodoListItemsWithFilter_todoList
        }
      }
    }
  `,
)
