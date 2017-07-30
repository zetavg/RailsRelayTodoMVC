import {
  commitMutation,
  graphql,
} from 'react-relay'
import PropTypes from 'prop-types'

import Mutation from './Mutation'

const mutation = graphql`
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

export default class UpdateTodoItemMutation extends Mutation {
  static propTypes = {
    todoItemID: PropTypes.string.isRequired,
    name: PropTypes.string,
    completed: PropTypes.bool,
  }

  commit = () => {
    const { environment, input } = this
    const {
      todoItemID,
      name,
      completed,
    } = input

    const optimisticResponsePayload = {
      todoItem: {
        id: todoItemID,
        name,
        completed,
      },
    }

    return commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {
            todoItemID,
            name,
            completed,
          },
        },
        optimisticResponse: {
          updateTodoItem: optimisticResponsePayload,
        },
      },
    )
  }
}

// function getOptimisticResponse(complete, todo, user) {
//   const viewerPayload = {id: user.id};
//   if (user.completedCount != null) {
//     viewerPayload.completedCount = complete ?
//       user.completedCount + 1 :
//       user.completedCount - 1;
//   }
//   return {
//     changeTodoStatus: {
//       todo: {
//         complete: complete,
//         id: todo.id,
//       },
//       viewer: viewerPayload,
//     },
//   };
// }

// function commit(
//   environment,
//   complete,
//   todo,
//   user,
// ) {
//   return commitMutation(
//     environment,
//     {
//       mutation,
//       variables: {
//         input: {complete, id: todo.id},
//       },
//       optimisticResponse: () => getOptimisticResponse(complete, todo, user),
//     }
//   );
// }
