import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from './relay/environment'

import TodoListItemsContainer from './containers/TodoListItems'

const TodoListItems = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TodoListItemsQuery(
        $count: Int!
        $cursor: String
      ) {
        viewer {
          todoList {
            ...TodoListItems_todoList
          }
        }
      }
    `}
    variables={{
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
