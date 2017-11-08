/* @flow */

import { graphql } from 'react-relay'
import Subscription from './_Subscription'

import type { TodoItemsUpdatedSubscriptionVariables } from './__generated__/TodoItemsUpdatedSubscription.graphql'

export default class TodoItemsUpdatedSubscription extends Subscription<TodoItemsUpdatedSubscriptionVariables> {
  static subscription = graphql`
    subscription TodoItemsUpdatedSubscription(
      $todoListID: ID!
    ) {
      todoItemsUpdated(todoListID: $todoListID) {
        updatedTodoItems {
          completed
          id
          name
        }
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
    }
  }
}
