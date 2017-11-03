import {
  commitMutation,
  graphql,
} from 'react-relay'
import PropTypes from 'prop-types'
import todoItemsRemovedUpdater from '../updaters/todoItemsRemovedUpdater'
import Mutation from './Mutation'

const mutation = graphql`
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

export default class MarkAllTodoItemsMutation extends Mutation {
  static propTypes = {
    todoItemID: PropTypes.string.isRequired,
    todoListID: PropTypes.string,
  }

  commit = () => {
    const { environment, input } = this
    const {
      todoItemID,
      todoListID,
    } = input

    return commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {
            todoItemID,
          },
        },
        updater: (store) => {
          const payload = store.getRootField('removeTodoItem')
          const todoListProxy = payload.getLinkedRecord('todoList')
          todoItemsRemovedUpdater(store, {
            todoListProxy,
            removedTodoItemID: todoItemID,
          })
        },
        optimisticUpdater: (store) => {
          if (!todoListID) return
          const todoListProxy = store.get(todoListID)

          todoItemsRemovedUpdater(store, {
            todoListProxy,
            removedTodoItemID: todoItemID,
          })

          const todoItemProxy = store.get(todoItemID)
          const todoListTodoItemsCount = todoListProxy.getValue('todoItemsCount')
          if (typeof todoListTodoItemsCount !== 'undefined') {
            todoListProxy.setValue(todoListTodoItemsCount - 1, 'todoItemsCount')
          }

          const todoItemCompleted = todoItemProxy.getValue('completed')
          if (typeof todoItemCompleted !== 'undefined') {
            if (todoItemCompleted) {
              const todoListCompletedTodoItemsCount = todoListProxy.getValue('completedTodoItemsCount')
              if (typeof todoListCompletedTodoItemsCount !== 'undefined') {
                todoListProxy.setValue(todoListCompletedTodoItemsCount - 1, 'completedTodoItemsCount')
              }
            } else {
              const todoListActiveTodoItemsCount = todoListProxy.getValue('activeTodoItemsCount')
              if (typeof todoListActiveTodoItemsCount !== 'undefined') {
                todoListProxy.setValue(todoListActiveTodoItemsCount - 1, 'activeTodoItemsCount')
              }
            }
          }
        },
      },
    )
  }
}

