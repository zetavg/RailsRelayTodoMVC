/* @flow */

import { ConnectionHandler } from 'relay-runtime'
import type {
  DataID,
  RelayRecordSourceSelectorProxy,
  RelayRecordProxy,
} from 'relay-runtime'
import todoListTodoItemsConnectionNames from '../registrations/todoListTodoItemsConnectionNames'

const todoItemRemovedUpdater = (store: RelayRecordSourceSelectorProxy, {
  todoListProxy,
  removedTodoItemID,
}: {
  todoListProxy: RelayRecordProxy,
  removedTodoItemID: DataID,
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
