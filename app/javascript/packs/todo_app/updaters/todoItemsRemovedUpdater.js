import { ConnectionHandler } from 'relay-runtime'
import todoListTodoItemsConnectionNames from '../registrations/todoListTodoItemsConnectionNames'

const todoItemRemovedUpdater = (store, {
  todoListProxy,
  removedTodoItemID,
}) => {
  todoListTodoItemsConnectionNames.forEach((connName) => {
    ['all', 'active', 'completed'].forEach((filter) => {
      const conn = ConnectionHandler.getConnection(
        todoListProxy,
        connName,
        { filter },
      )
      if (!conn) return
      ConnectionHandler.deleteNode(conn, removedTodoItemID)
    })
  })
}

export default todoItemRemovedUpdater
