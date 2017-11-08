/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy } from 'relay-runtime'
import Subscription from './_Subscription'

import type { TodoItemRemovedSubscriptionVariables } from './__generated__/TodoItemRemovedSubscription.graphql'

import todoItemRemovedUpdater from '../updaters/todoItemRemovedUpdater'

export default class TodoItemRemovedSubscription extends Subscription<TodoItemRemovedSubscriptionVariables> {
  static subscription = graphql`
    subscription TodoItemRemovedSubscription(
      $todoListID: ID!
    ) {
      todoItemRemoved(todoListID: $todoListID) {
        removedTodoItemID
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
        const payload = store.getRootField('todoItemRemoved')
        if (!payload) throw new Error('cannot get payload')
        const removedTodoItemID = payload.getValue('removedTodoItemID')
        if (!removedTodoItemID) throw new Error('cannot get removedTodoItemID')
        const todoListProxy = payload.getLinkedRecord('todoList')
        if (!todoListProxy) throw new Error('cannot get todoList')

        todoItemRemovedUpdater(store, {
          todoListProxy,
          removedTodoItemID,
        })
      },
    }
  }
}
