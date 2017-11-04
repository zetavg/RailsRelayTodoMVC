/* @flow */

/**
 * Updaters can use this registration to iterate over each connection and
 * update them.
 */
const todoListTodoItemsConnectionNames: Array<string> = []
export default todoListTodoItemsConnectionNames

/**
 * Containers that queries the 'todoItems' connection on a 'TodoList' node
 * should register their key with this function.
 */
export const registerTodoListTodoItemsConnectionName =
  (key: string): void => { todoListTodoItemsConnectionNames.push(key) }
