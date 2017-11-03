import {
  requestSubscription,
  graphql,
} from 'react-relay'
import Subscription from './Subscription'

import todoItemRemovedUpdater from '../updaters/todoItemRemovedUpdater'

const subscription = graphql`
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

export default class TodoItemRemovedSubscription extends Subscription {
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
          const payload = store.getRootField('todoItemRemoved')
          const removedTodoItemID = payload.getValue('removedTodoItemID')
          const todoListProxy = payload.getLinkedRecord('todoList')

          todoItemRemovedUpdater(store, {
            todoListProxy,
            removedTodoItemID,
          })
        },
      }
    )
  }
}
