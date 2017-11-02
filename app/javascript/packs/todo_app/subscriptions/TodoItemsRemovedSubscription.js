import {
  requestSubscription,
  graphql,
} from 'react-relay'
import Subscription from './Subscription'

import { sharedUpdater } from '../mutations/ClearCompletedTodoItemsMutation'

const subscription = graphql`
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

export default class TodoItemsRemovedSubscription extends Subscription {
  subscribe = () => {
    const { environment, variables } = this

    this.disposable = requestSubscription(
      environment,
      {
        subscription,
        variables,
        onCompleted: () => console.log('onCompleted'),
        onError: error => { debugger; console.error(error)},
        updater: store => {
          const payload = store.getRootField('todoItemsRemoved')
          const removedTodoItemIDs = payload.getValue('removedTodoItemIDs')
          const todoListProxy = payload.getLinkedRecord('todoList')

          sharedUpdater(store, {
            todoListProxy,
            removedTodoItemIDs,
          })
        },
      }
    )
  }
}
