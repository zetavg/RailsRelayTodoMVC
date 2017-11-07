/* @flow */

import { graphql } from 'react-relay'
import type { DataID } from 'relay-runtime'
import validate from 'validate.js'
import Mutation from './_Mutation'

export type UpdateTodoItemInput = {|
  todoItemID: DataID,
  name?: string,
  completed?: boolean,
|};

export default class UpdateTodoItemMutation extends Mutation<UpdateTodoItemInput> {
  static mutation = graphql`
    mutation UpdateTodoItemMutation($input: UpdateTodoItemInput!) {
      updateTodoItem(input: $input) {
        todoItem {
          id
          name
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
    // TODO: add async validation to ensure todo item with the id exists
    todoItemID: {
      presence: true,
    },
    name: (value) => {
      if (!validate.isDefined(value)) return {}

      return {
        presence: { allowEmpty: false },
      }
    },
  }

  getMutationConfig() {
    const { input } = this

    const optimisticResponsePayload = {
      todoItem: {
        id: input.todoItemID,
        name: input.name,
        completed: input.completed,
      },
    }

    return {
      optimisticResponse: {
        updateTodoItem: optimisticResponsePayload,
      },
    }
  }

  // isValid = () => {
  //   const { input } = this
  //   const {
  //     todoItemID,
  //     name,
  //   } = input
  //   if (!todoItemID) return false
  //   if (typeof name !== 'undefined') {
  //     if (!name) return false
  //   }
  //   return true
  // }
}
