import {
  commitMutation,
  graphql,
} from 'react-relay'
// import { ConnectionHandler } from 'relay-runtime'
import PropTypes from 'prop-types'
// import todoListTodoItemsConnectionNames from '../registrations/todoListTodoItemsConnectionNames'
import Mutation from './Mutation'

const mutation = graphql`
  mutation MarkAllTodoItemsMutation($input: MarkAllTodoItemsInput!) {
    markAllTodoItems(input: $input) {
      changedTodoItems {
        id
        completed
      }
      todoList {
        id
        completedTodoItemsCount
        activeTodoItemsCount
      }
    }
  }
`

export default class MarkAllTodoItemsMutation extends Mutation {
  static propTypes = {
    todoListID: PropTypes.string.isRequired,
    completed: PropTypes.bool,
  }

  commit = () => {
    const { environment, input } = this
    const {
      todoListID,
      completed,
    } = input

    return commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {
            todoListID,
            completed,
          },
        },
        // optimisticResponse: () => {
        //   return getOptimisticResponse(store, { todoListID, completed })
        // },
      },
    )
  }
}

// const getOptimisticResponse = (store, { todoListID, completed }) => {
//   const todoListProxy = store.get(todoListID)
//   const changedTodoItemIDsSet = new Set()

//   todoListTodoItemsConnectionNames.forEach((connName) => {
//     const conn = ConnectionHandler.getConnection(
//       todoListProxy,
//       connName,
//     )

//     const changedTodoItemIDs = conn.getLinkedRecords('edges')
//       .map(p => p.getLinkedRecord('node'))
//       .filter(n => n.getValue('completed') !== completed)
//       .map(n => n.getValue('id'))

//     changedTodoItemIDs.forEach(id => changedTodoItemIDsSet.add(id))
//   })

//   const changedTodoItemIDs = Array.from(changedTodoItemIDsSet)

//   const payload = {
//     changedTodoItems: changedTodoItemIDs.map(id => ({ id, completed })),
//   }

//   const todoListTodoItemsCount = todoListProxy.getValue('todoItemsCount')
//   if (typeof todoListTodoItemsCount !== 'undefined') {
//     payload.todoList = {
//       id: todoListID,
//       completedTodoItemsCount: completed ? todoListTodoItemsCount : 0,
//       activeTodoItemsCount: completed ? 0 : todoListTodoItemsCount,
//     }
//   }

//   return {
//     markAllTodoItems: payload,
//   }
// }
