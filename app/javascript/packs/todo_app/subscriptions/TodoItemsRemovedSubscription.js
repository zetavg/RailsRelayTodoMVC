/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy } from 'relay-runtime'
import Subscription from './_Subscription'

import type { TodoItemsRemovedSubscriptionVariables } from './__generated__/TodoItemsRemovedSubscription.graphql'

import todoItemsRemovedUpdater from '../updaters/todoItemsRemovedUpdater'

export default class TodoItemsRemovedSubscription extends Subscription<TodoItemsRemovedSubscriptionVariables> {
  static subscription = graphql`
    subscription TodoItemsRemovedSubscription(
      $todoListID: ID!
    ) {
      todoItemsRemoved(todoListID: $todoListID) {
        removedTodoItemIDs
        todoList {
          id
          completedTodoItemsCount
          activeTodoItemsCount
        }
      }
    }
  `

  getSubscriptionConfig() {
    return {
      onCompleted: () => { console.log('completed') },
      onError: (error: Error) => { console.error(error) },
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('todoItemsRemoved')
        if (!payload) throw new Error('cannot get payload')
        const removedTodoItemIDs = payload.getValue('removedTodoItemIDs')
        if (!removedTodoItemIDs) throw new Error('cannot get removedTodoItemIDs')
        if (!(removedTodoItemIDs instanceof Array)) throw new Error('removedTodoItemIDs is not an array')
        const todoListProxy = payload.getLinkedRecord('todoList')
        if (!todoListProxy) throw new Error('cannot get todoList')

        todoItemsRemovedUpdater(store, {
          todoListProxy,
          removedTodoItemIDs,
        })
      },
    }
  }
}
