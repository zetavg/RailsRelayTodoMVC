/* @flow */

import { graphql } from 'react-relay'
import type { DataID, RecordSourceSelectorProxy } from 'relay-runtime'
import todoItemRemovedUpdater from '../updaters/todoItemRemovedUpdater'
import Mutation from './_Mutation'

export type RemoveTodoItemInput = {
  todoItemID?: DataID,
  todoListID?: DataID,
}

export default class RemoveTodoItemMutation extends Mutation<RemoveTodoItemInput> {
  static mutation = graphql`
    mutation RemoveTodoItemMutation($input: RemoveTodoItemInput!) {
      removeTodoItem(input: $input) {
        removedTodoItem {
          id
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

  static constraints = {
    // TODO: add async validation to ensure todo list and todo item with the id exists
    todoItemID: {
      presence: true,
    },
    // todoListID: {
    //   presence: true,
    // },
  }

  getMutationConfig() {
    const { input } = this

    return {
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('removeTodoItem')
        if (!payload) throw new Error('Cannot get payload')
        const todoListProxy = payload.getLinkedRecord('todoList')
        if (!todoListProxy) throw new Error('Cannot get todoList')
        if (!input.todoItemID) throw new Error('Error: input.todoItemID')
        todoItemRemovedUpdater(store, {
          todoListProxy,
          removedTodoItemID: input.todoItemID,
        })
      },
      optimisticUpdater: (store: RecordSourceSelectorProxy) => {
        if (!input.todoListID) return
        const todoListProxy = store.get(input.todoListID)
        if (!todoListProxy) throw new Error('Cannot get todoList')
        if (!input.todoItemID) throw new Error('Error: input.todoItemID')

        todoItemRemovedUpdater(store, {
          todoListProxy,
          removedTodoItemID: input.todoItemID,
        })

        const todoItemProxy = store.get(input.todoItemID)
        if (!todoItemProxy) throw new Error('Cannot get todoItem')
        const todoListTodoItemsCount = todoListProxy.getValue('todoItemsCount')
        if (typeof todoListTodoItemsCount === 'number') {
          todoListProxy.setValue(todoListTodoItemsCount - 1, 'todoItemsCount')
        }

        const todoItemCompleted = todoItemProxy.getValue('completed')
        if (typeof todoItemCompleted !== 'undefined') {
          if (todoItemCompleted) {
            const todoListCompletedTodoItemsCount = todoListProxy.getValue('completedTodoItemsCount')
            if (typeof todoListCompletedTodoItemsCount === 'number') {
              todoListProxy.setValue(todoListCompletedTodoItemsCount - 1, 'completedTodoItemsCount')
            }
          } else {
            const todoListActiveTodoItemsCount = todoListProxy.getValue('activeTodoItemsCount')
            if (typeof todoListActiveTodoItemsCount === 'number') {
              todoListProxy.setValue(todoListActiveTodoItemsCount - 1, 'activeTodoItemsCount')
            }
          }
        }
      },
    }
  }
}

