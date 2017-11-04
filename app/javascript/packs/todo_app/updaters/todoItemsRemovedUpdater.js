/* @flow */

import { ConnectionHandler } from 'relay-runtime'
import type {
  DataID,
  RelayRecordSourceSelectorProxy,
  RelayRecordProxy,
} from 'relay-runtime'
import todoListTodoItemsConnectionNames from '../registrations/todoListTodoItemsConnectionNames'

const todoItemsRemovedUpdater = (store: RelayRecordSourceSelectorProxy, {
  todoListProxy,
  removedTodoItemIDs,
}: {
  todoListProxy: RelayRecordProxy,
  removedTodoItemIDs: Array<DataID>,
}) => {
  todoListTodoItemsConnectionNames.forEach((connName) => {
    ['all', 'active', 'completed'].forEach((filter) => {
      const conn = ConnectionHandler.getConnection(
        todoListProxy,
        connName,
        { filter },
      )
      if (!conn) return
      removedTodoItemIDs.forEach(removedID => ConnectionHandler.deleteNode(conn, removedID))
    })
  })
}

export default todoItemsRemovedUpdater
