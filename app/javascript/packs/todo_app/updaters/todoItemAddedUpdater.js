/* @flow */

import { ConnectionHandler } from 'relay-runtime'
import type {
  RelayRecordSourceSelectorProxy,
  RelayRecordProxy,
} from 'relay-runtime'
import todoListTodoItemsConnectionNames from '../registrations/todoListTodoItemsConnectionNames'

const todoItemAddedUpdater = (store: RelayRecordSourceSelectorProxy, {
  todoListProxy,
  todoListTodoItemsConnectionEdge,
}: {
  todoListProxy: RelayRecordProxy,
  todoListTodoItemsConnectionEdge: RelayRecordProxy,
}) => {
  todoListTodoItemsConnectionNames.forEach((connName) => {
    ['all', 'active', 'completed'].forEach((filter) => {
      const conn = ConnectionHandler.getConnection(
        todoListProxy,
        connName,
        { filter },
      )
      if (!conn) return

      const todoItemNode = todoListTodoItemsConnectionEdge.getLinkedRecord('node')
      if (!todoItemNode) throw new Error('Cannot get node from todoListTodoItemsConnectionEdge')
      const completed = todoItemNode.getValue('completed')

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
