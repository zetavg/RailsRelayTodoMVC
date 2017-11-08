/* @flow */

import { graphql } from 'react-relay'
import Subscription from './_Subscription'

import type { TodoItemUpdatedSubscriptionVariables } from './__generated__/TodoItemUpdatedSubscription.graphql'

export default class TodoItemUpdatedSubscription extends Subscription<TodoItemUpdatedSubscriptionVariables> {
  static subscription = graphql`
    subscription TodoItemUpdatedSubscription(
      $todoListID: ID!
    ) {
      todoItemUpdated(todoListID: $todoListID) {
        todoItem {
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
