import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from './relay/environment'

import TodoListItemsContainer from './containers/TodoListItems'

const TodoListItems = (todoListID) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TodoListItemsQuery(
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
    `}
    variables={{
      todoListID,
      filter: 'all',
      count: 1000,
    }}
    render={({ error, props }) => {
      if (error) {
        throw error
      } else if (props) {
        return <TodoListItemsContainer todoList={props.viewer.todoList} />
      }
      return <div>Loading</div>
    }}
  />
)

export default TodoListItems
