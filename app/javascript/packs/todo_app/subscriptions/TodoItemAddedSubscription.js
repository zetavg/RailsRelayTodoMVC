import {
  requestSubscription,
  graphql,
} from 'react-relay'
import Subscription from './Subscription'

import todoItemAddedUpdater from '../updaters/todoItemAddedUpdater'

const subscription = graphql`
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

let tempID = 0

export default class TodoItemAddedSubscription extends Subscription {
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
          const payload = store.getRootField('todoItemAdded')
          const todoListProxy = payload.getLinkedRecord('todoList')
          const todoItemProxy = payload.getLinkedRecord('todoItem')

          const todoListTodoItemsConnectionEdge = store.create(
            `client:TodoItemAddedSubscription:todoListTodoItemsConnectionEdge:${tempID++}`,
            'TodoItemEdge',
          )
          todoListTodoItemsConnectionEdge.setLinkedRecord(todoItemProxy, 'node')

          todoItemAddedUpdater(store, {
            todoListProxy,
            todoListTodoItemsConnectionEdge,
          })

          todoListProxy.setValue(
            todoListProxy.getValue('todoItemsCount') + 1,
            'todoItemsCount',
          )

          const completed = todoItemProxy.getValue('completed')

          if (completed) {
            todoListProxy.setValue(
              todoListProxy.getValue('completedTodoItemsCount') + 1,
              'completedTodoItemsCount',
            )
          } else {
            todoListProxy.setValue(
              todoListProxy.getValue('activeTodoItemsCount') + 1,
              'activeTodoItemsCount',
            )
          }
        },
      }
    )
  }
}
