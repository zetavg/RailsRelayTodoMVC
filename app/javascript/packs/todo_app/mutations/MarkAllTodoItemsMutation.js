/* @flow */

import { graphql } from 'react-relay'
import type { DataID } from 'relay-runtime'
import Mutation from './_Mutation'

export type MarkAllTodoItemsInput = {|
  todoListID: DataID,
  completed: boolean,
|};

export default class MarkAllTodoItemsMutation extends Mutation<MarkAllTodoItemsInput> {
  static mutation = graphql`
    mutation MarkAllTodoItemsMutation($input: MarkAllTodoItemsInput!) {
      markAllTodoItems(input: $input) {
        changedTodoItems {
          id
          completed
        }
        todoList {
          id
          completedTodoItemsCount
          activeTodoItemsCount
        }
      }
    }
  `

  static constraints = {
    // TODO: add async validation to ensure todo list with the id exists
    todoListID: {
      presence: true,
    },
  }
}
