import { ConnectionHandler } from 'relay-runtime'
import todoListTodoItemsConnectionNames from '../registrations/todoListTodoItemsConnectionNames'

const todoItemAddedUpdater = (store, {
  todoListProxy,
  todoListTodoItemsConnectionEdge,
}) => {
  todoListTodoItemsConnectionNames.forEach((connName) => {
    ['all', 'active', 'completed'].forEach((filter) => {
      const conn = ConnectionHandler.getConnection(
        todoListProxy,
        connName,
        { filter },
      )
      if (!conn) return

      const completed = todoListTodoItemsConnectionEdge.getLinkedRecord('node').getValue('completed')

      if (
        (filter === 'all') ||
        (filter === 'active' && !completed) ||
        (filter === 'completed' && completed)
      ) {
        ConnectionHandler.insertEdgeAfter(conn, todoListTodoItemsConnectionEdge)
      }
    })
  })
}

export default todoItemAddedUpdater
