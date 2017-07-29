import { graphql, createPaginationContainer } from 'react-relay'
import TodoListItemsComponent from '../components/TodoListItems'

export default createPaginationContainer(
  TodoListItemsComponent,
  graphql`
    fragment TodoListItems_todoList on TodoList {
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
