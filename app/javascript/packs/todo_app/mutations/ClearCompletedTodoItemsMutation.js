import {
  commitMutation,
  graphql,
} from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import PropTypes from 'prop-types'
import todoListTodoItemsConnectionNames from '../registrations/todoListTodoItemsConnectionNames'
import todoItemsRemovedUpdater from '../updaters/todoItemsRemovedUpdater'
import Mutation from './Mutation'

const mutation = graphql`
  mutation ClearCompletedTodoItemsMutation($input: ClearCompletedTodoItemsInput!) {
    clearCompletedTodoItems(input: $input) {
      removedTodoItems {
        id
      }
      todoList {
        id
        todoItemsCount
        completedTodoItemsCount
      }
    }
  }
`

export default class ClearCompletedTodoItemsMutation extends Mutation {
  static propTypes = {
    todoListID: PropTypes.string.isRequired,
  }

  commit = () => {
    const { environment, input } = this
    const {
      todoListID,
    } = input

    return commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {
            todoListID,
          },
        },
        updater: (store) => {
          const payload = store.getRootField('clearCompletedTodoItems')
          const todoListProxy = payload.getLinkedRecord('todoList')
          const removedTodoItemProxies = payload.getLinkedRecords('removedTodoItems')
          const removedTodoItemIDs = removedTodoItemProxies.map(p => p.getValue('id'))
          todoItemsRemovedUpdater(store, {
            todoListProxy,
            removedTodoItemIDs,
          })
        },
        optimisticUpdater: (store) => {
          const todoListProxy = store.get(todoListID)
          const removedTodoItemIDsSet = new Set()

          todoListTodoItemsConnectionNames.forEach((connName) => {
            ['all', 'active', 'completed'].forEach((filter) => {
              const conn = ConnectionHandler.getConnection(
                todoListProxy,
                connName,
                { filter },
              )

              if (!conn) return

              const completedTodoItemIDs = conn.getLinkedRecords('edges')
                .map(p => p.getLinkedRecord('node'))
                .filter(n => n.getValue('completed'))
                .map(n => n.getValue('id'))

              completedTodoItemIDs.forEach(id => removedTodoItemIDsSet.add(id))
            })
          })

          todoItemsRemovedUpdater(store, {
            todoListProxy,
            removedTodoItemIDs: Array.from(removedTodoItemIDsSet),
          })
        },
      },
    )
  }
}
