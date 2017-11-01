/**
 * @flow
 * @relayHash da4b97796298e191f3133e77f0cdaa30
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type MarkAllTodoItemsMutationVariables = {|
  input: {
    clientMutationId?: ?string;
    completed: boolean;
    todoListID: string;
  };
|};
export type MarkAllTodoItemsMutationResponse = {|
  +markAllTodoItems: ?{|
    +changedTodoItems: $ReadOnlyArray<?{|
      +id: string;
      +completed: boolean;
    |}>;
    +todoList: {|
      +id: string;
      +completedTodoItemsCount: ?number;
      +activeTodoItemsCount: ?number;
    |};
  |};
|};
*/


/*
mutation MarkAllTodoItemsMutation(
  $input: MarkAllTodoItemsInput!
) {
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
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "MarkAllTodoItemsInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MarkAllTodoItemsMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "MarkAllTodoItemsInput!"
          }
        ],
        "concreteType": "MarkAllTodoItemsPayload",
        "name": "markAllTodoItems",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoItem",
            "name": "changedTodoItems",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completed",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoList",
            "name": "todoList",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completedTodoItemsCount",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "activeTodoItemsCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "MarkAllTodoItemsMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "MarkAllTodoItemsInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "MarkAllTodoItemsMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "MarkAllTodoItemsInput!"
          }
        ],
        "concreteType": "MarkAllTodoItemsPayload",
        "name": "markAllTodoItems",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoItem",
            "name": "changedTodoItems",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completed",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoList",
            "name": "todoList",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completedTodoItemsCount",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "activeTodoItemsCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation MarkAllTodoItemsMutation(\n  $input: MarkAllTodoItemsInput!\n) {\n  markAllTodoItems(input: $input) {\n    changedTodoItems {\n      id\n      completed\n    }\n    todoList {\n      id\n      completedTodoItemsCount\n      activeTodoItemsCount\n    }\n  }\n}\n"
};

module.exports = batch;
