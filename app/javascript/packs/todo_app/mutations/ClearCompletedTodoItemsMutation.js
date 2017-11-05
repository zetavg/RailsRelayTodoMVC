/* @flow */

import { graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import type { RecordSourceSelectorProxy } from 'relay-runtime'
import todoListTodoItemsConnectionNames from '../registrations/todoListTodoItemsConnectionNames'
import todoItemsRemovedUpdater from '../updaters/todoItemsRemovedUpdater'
import Mutation from './_Mutation'

export type ClearCompletedTodoItemsInput = {
  todoListID?: string,
}

export default class ClearCompletedTodoItemsMutation extends Mutation<ClearCompletedTodoItemsInput> {
  static mutation = graphql`
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

  static constraints = {
    // TODO: add async validation to ensure todo list with the id exists
    todoListID: {
      presence: true,
    },
  }

  getMutationConfig() {
    const { input } = this

    return {
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('clearCompletedTodoItems')
        if (!payload) throw new Error('Cannot get payload')
        const todoListProxy = payload.getLinkedRecord('todoList')
        if (!todoListProxy) throw new Error('Cannot get todoListProxy')
        const removedTodoItemProxies = payload.getLinkedRecords('removedTodoItems')
        if (!removedTodoItemProxies) throw new Error('Cannot get removedTodoItemProxies')
        const removedTodoItemIDs = removedTodoItemProxies.map(p => p && p.getValue('id'))
        todoItemsRemovedUpdater(store, {
          todoListProxy,
          removedTodoItemIDs,
        })
      },
      optimisticUpdater: (store: RecordSourceSelectorProxy) => {
        const todoListProxy = store.get(input.todoListID)
        if (!todoListProxy) throw new Error('Cannot get todoListProxy')
        const removedTodoItemIDsSet = new Set()

        todoListTodoItemsConnectionNames.forEach((connName) => {
          ['all', 'active', 'completed'].forEach((filter) => {
            const conn = ConnectionHandler.getConnection(
              todoListProxy,
              connName,
              { filter },
            )

            if (!conn) return

            const edges = conn.getLinkedRecords('edges')
            if (!edges) throw new Error('Cannot get edges')

            const completedTodoItemIDs = edges
              .map(p => p && p.getLinkedRecord('node'))
              .filter(n => n && n.getValue('completed'))
              .map(n => n && n.getValue('id'))

            completedTodoItemIDs.forEach(id => removedTodoItemIDsSet.add(id))
          })
        })

        todoItemsRemovedUpdater(store, {
          todoListProxy,
          removedTodoItemIDs: Array.from(removedTodoItemIDsSet),
        })
      },
    }
  }
}
