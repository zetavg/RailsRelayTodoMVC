/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy } from 'relay-runtime'
import Subscription from './_Subscription'

import type { TodoItemAddedSubscriptionVariables } from './__generated__/TodoItemAddedSubscription.graphql'

import todoItemAddedUpdater from '../updaters/todoItemAddedUpdater'

let tempID = 0

export default class TodoItemAddedSubscription extends Subscription<TodoItemAddedSubscriptionVariables> {
  static subscription = graphql`
    subscription TodoItemAddedSubscription(
      $todoListID: ID!
    ) {
      todoItemAdded(todoListID: $todoListID) {
        todoItem {
          completed
          id
          name
        }
        todoList {
          id
        }
      }
    }
  `

  getSubscriptionConfig() {
    return {
      onCompleted: () => { console.log('completed') },
      onError: (error: Error) => { console.error(error) },
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('todoItemAdded')
        if (!payload) throw new Error('cannot get payload')
        const todoListProxy = payload.getLinkedRecord('todoList')
        if (!todoListProxy) throw new Error('cannot get todoList')
        const todoItemProxy = payload.getLinkedRecord('todoItem')
        if (!todoItemProxy) throw new Error('cannot get todoItem')

        const todoListTodoItemsConnectionEdge = store.create(
          `client:TodoItemAddedSubscription:todoListTodoItemsConnectionEdge:${tempID++}`,
          'TodoItemEdge',
        )
        todoListTodoItemsConnectionEdge.setLinkedRecord(todoItemProxy, 'node')

        todoItemAddedUpdater(store, {
          todoListProxy,
          todoListTodoItemsConnectionEdge,
        })

        const currentTodoItemsCount = todoListProxy.getValue('todoItemsCount')
        if (typeof currentTodoItemsCount !== 'number') throw new Error('todoItemsCount is not a number')

        const currentCompletedTodoItemsCount = todoListProxy.getValue('completedTodoItemsCount')
        if (typeof currentCompletedTodoItemsCount !== 'number') throw new Error('completedTodoItemsCount is not a number')

        const currentActiveTodoItemsCount = todoListProxy.getValue('activeTodoItemsCount')
        if (typeof currentActiveTodoItemsCount !== 'number') throw new Error('activeTodoItemsCount is not a number')

        todoListProxy.setValue(
          currentTodoItemsCount + 1,
          'todoItemsCount',
        )

        const completed = todoItemProxy.getValue('completed')

        if (completed) {
          todoListProxy.setValue(
            currentCompletedTodoItemsCount + 1,
            'completedTodoItemsCount',
          )
        } else {
          todoListProxy.setValue(
            currentActiveTodoItemsCount + 1,
            'activeTodoItemsCount',
          )
        }
      },
    }
  }
}
