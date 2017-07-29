import { graphql, createFragmentContainer } from 'react-relay'

import TodoItemComponent from '../components/TodoItem'

export default createFragmentContainer(
  TodoItemComponent,
  graphql`
    fragment TodoItem_todoItem on TodoItem {
      completed
      name
    }
  `,
)
