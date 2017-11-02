import {
  commitMutation,
  graphql,
} from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import PropTypes from 'prop-types'
import todoListTodoItemsConnectionNames from '../registrations/todoListTodoItemsConnectionNames'
import Mutation from './Mutation'

const mutation = graphql`
  mutation AddTodoItemMutation($input: AddTodoItemInput!) {
    addTodoItem(input: $input) {
      todoListTodoItemsConnectionEdge {
        __typename
        cursor
        node {
          completed
          id
          name
        }
      }
      todoList {
        id
        todoItemsCount
        completedTodoItemsCount
        activeTodoItemsCount
      }
    }
  }
`

let tempID = 0

export default class AddTodoItemMutation extends Mutation {
  static propTypes = {
    todoListID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bool: PropTypes.bool,
  }

  commit = () => {
    const { environment, input } = this
    const {
      todoListID,
      name,
      completed,
    } = input

    return commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {
            clientMutationId: `${tempID++}`,
            todoListID,
            name,
            completed,
          },
        },
        updater: (store) => {
          const payload = store.getRootField('addTodoItem')
          const todoListTodoItemsConnectionEdge = payload.getLinkedRecord('todoListTodoItemsConnectionEdge')
          const todoListProxy = payload.getLinkedRecord('todoList')

          sharedUpdater(store, {
            todoListProxy,
            todoListTodoItemsConnectionEdge,
          })
        },
        optimisticUpdater: (store) => {
          const todoListProxy = store.get(todoListID)
          const newTodoItemID = `client:newTodoItem:${tempID++}`
          const newTodoItemNode = store.create(newTodoItemID, 'TodoItem')
          newTodoItemNode.setValue(newTodoItemID, 'id')
          newTodoItemNode.setValue(input.name, 'name')
          newTodoItemNode.setValue(input.completed || false, 'completed')
          const newTodoItemEdge = store.create(
            `client:newTodoItemEdge:${tempID++}`,
            'TodoItemEdge',
          )
          newTodoItemEdge.setLinkedRecord(newTodoItemNode, 'node')

          sharedUpdater(store, {
            todoListProxy,
            todoListTodoItemsConnectionEdge: newTodoItemEdge,
          })

          todoListProxy.setValue(
            todoListProxy.getValue('todoItemsCount') + 1,
            'todoItemsCount',
          )
          if (completed) {
            todoListProxy.setValue(
              todoListProxy.getValue('completedTodoItemsCount') + 1,
              'completedTodoItemsCount',
            )
          } else {
            todoListProxy.setValue(
              todoListProxy.getValue('activeTodoItemsCount') + 1,
              'activeTodoItemsCount',
            )
          }
        },
      },
    )
  }
}

export const sharedUpdater = (store, {
  todoListProxy,
  todoListTodoItemsConnectionEdge,
}) => {
  todoListTodoItemsConnectionNames.forEach((connName) => {
    ['all', 'active', 'completed'].forEach((filter) => {
      const conn = ConnectionHandler.getConnection(
        todoListProxy,
        connName,
        { filter },
      )
      if (!conn) return

      const completed = todoListTodoItemsConnectionEdge.getLinkedRecord('node').getValue('completed')

      if (
        (filter === 'all') ||
        (filter === 'active' && !completed) ||
        (filter === 'completed' && completed)
      ) {
        ConnectionHandler.insertEdgeAfter(conn, todoListTodoItemsConnectionEdge)
      }
    })
  })
}
