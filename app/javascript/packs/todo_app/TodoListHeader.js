import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from './relay/environment'

import TodoListHeaderContainer from './containers/TodoListHeader'

const TodoListHeader = todoListID => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TodoListHeaderQuery(
        $todoListID: ID
      ) {
        viewer {
          todoList(id: $todoListID) {
            ...TodoListHeader_todoList
          }
        }
      }
    `}
    variables={{
      todoListID,
    }}
    render={({ error, props }) => {
      if (error) {
        throw error
      } else if (props) {
        return <TodoListHeaderContainer todoList={props.viewer.todoList} />
      }
      return <div>Loading</div>
    }}
  />
)

export default TodoListHeader
