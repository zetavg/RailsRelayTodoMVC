import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from './relay/environment'

import TodoListCardContainer from './containers/TodoListCard'

const TodoListCard = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TodoListCardQuery(
        $count: Int!
        $cursor: String
        $filter: TodoListTodoItemsFilterEnum
      ) {
        viewer {
          todoList {
            ...TodoListCard_todoList
          }
        }
      }
    `}
    variables={{
      filter: 'all',
      count: 10,
    }}
    render={({ error, props }) => {
      if (error) {
        throw error
      } else if (props) {
        return <TodoListCardContainer todoList={props.viewer.todoList} />
      }
      return <div>Loading</div>
    }}
  />
)

export default TodoListCard
