import {
  requestSubscription,
  graphql,
} from 'react-relay'
import Subscription from './Subscription'

const subscription = graphql`
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

export default class TodoItemsUpdatedSubscription extends Subscription {
  subscribe = () => {
    const { environment, variables } = this

    this.disposable = requestSubscription(
      environment,
      {
        subscription,
        variables,
        onCompleted: () => console.log('onCompleted'),
        onError: error => { debugger; console.error(error)},
      }
    )
  }
}
