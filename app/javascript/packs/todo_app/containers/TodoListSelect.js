import { graphql, createFragmentContainer } from 'react-relay'

import TodoListSelectComponent from '../components/TodoListSelect'

export default createFragmentContainer(
  TodoListSelectComponent,
  graphql`
    fragment TodoListSelect_todoListHolder on TodoListsHolder {
      todoLists {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `,
)
