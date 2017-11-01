import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from './relay/environment'

import TodoListFooterContainer from './containers/TodoListFooter'

const TodoListFooter = (todoListID) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TodoListFooterQuery(
        $todoListID: ID
      ) {
        viewer {
          todoList(id: $todoListID) {
            ...TodoListFooter_todoList
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
        return <TodoListFooterContainer todoList={props.viewer.todoList} />
      }
      return <div>Loading</div>
    }}
  />
)

export default TodoListFooter
