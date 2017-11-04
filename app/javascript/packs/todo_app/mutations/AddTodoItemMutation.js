/* @flow */

import { graphql } from 'react-relay'
import type { RecordSourceSelectorProxy } from 'relay-runtime'
import todoItemAddedUpdater from '../updaters/todoItemAddedUpdater'
import Mutation from './_Mutation'

let tempID = 0

export type AddTodoItemInput = {
  todoListID: string,
  name: string,
  completed: boolean,
}

export default class AddTodoItemMutation extends Mutation<AddTodoItemInput> {
  static mutation = graphql`
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

  getMutationConfig() {
    const { input } = this

    return {
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('addTodoItem')
        if (!payload) throw new Error('Cannot get addTodoItem')
        const todoListTodoItemsConnectionEdge = payload.getLinkedRecord('todoListTodoItemsConnectionEdge')
        if (!todoListTodoItemsConnectionEdge) throw new Error('Cannot get todoListTodoItemsConnectionEdge')
        const todoListProxy = payload.getLinkedRecord('todoList')
        if (!todoListProxy) throw new Error('Cannot get todoListProxy')

        todoItemAddedUpdater(store, {
          todoListProxy,
          todoListTodoItemsConnectionEdge,
        })
      },
      optimisticUpdater: (store: RecordSourceSelectorProxy) => {
        const todoListProxy = store.get(input.todoListID)
        if (!todoListProxy) throw new Error(`Cannot get TodoList with ID: ${input.todoListID} from Relay store`)
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

        todoItemAddedUpdater(store, {
          todoListProxy,
          todoListTodoItemsConnectionEdge: newTodoItemEdge,
        })

        todoListProxy.setValue(
          parseInt(todoListProxy.getValue('todoItemsCount'), 10) + 1,
          'todoItemsCount',
        )
        if (input.completed) {
          todoListProxy.setValue(
            parseInt(todoListProxy.getValue('completedTodoItemsCount'), 10) + 1,
            'completedTodoItemsCount',
          )
        } else {
          todoListProxy.setValue(
            parseInt(todoListProxy.getValue('activeTodoItemsCount'), 10) + 1,
            'activeTodoItemsCount',
          )
        }
      },
    }
  }
}
