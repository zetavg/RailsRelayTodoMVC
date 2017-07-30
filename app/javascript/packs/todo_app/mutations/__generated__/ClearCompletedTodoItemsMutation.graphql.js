/**
 * @flow
 * @relayHash ab5bf1836a5a26bea33badc53774e78f
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ClearCompletedTodoItemsMutationVariables = {|
  input: {
    clientMutationId?: ?string;
    todoListID: string;
  };
|};

export type ClearCompletedTodoItemsMutationResponse = {|
  +clearCompletedTodoItems: ?{|
    +removedTodoItems: $ReadOnlyArray<?{|
      +id: string;
    |}>;
    +todoList: {|
      +id: string;
      +todoItemsCount: ?number;
      +completedTodoItemsCount: ?number;
    |};
  |};
|};
*/


/*
mutation ClearCompletedTodoItemsMutation(
  $input: ClearCompletedTodoItemsInput!
) {
  clearCompletedTodoItems(input: $input) {
    removedTodoItems {
      id
    }
    todoList {
      id
      todoItemsCount
      completedTodoItemsCount
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
        "type": "ClearCompletedTodoItemsInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ClearCompletedTodoItemsMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "ClearCompletedTodoItemsInput!"
          }
        ],
        "concreteType": "ClearCompletedTodoItemsPayload",
        "name": "clearCompletedTodoItems",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoItem",
            "name": "removedTodoItems",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
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
                "name": "todoItemsCount",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completedTodoItemsCount",
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
  "name": "ClearCompletedTodoItemsMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "ClearCompletedTodoItemsInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ClearCompletedTodoItemsMutation",
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
            "type": "ClearCompletedTodoItemsInput!"
          }
        ],
        "concreteType": "ClearCompletedTodoItemsPayload",
        "name": "clearCompletedTodoItems",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "TodoItem",
            "name": "removedTodoItems",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
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
                "name": "todoItemsCount",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "completedTodoItemsCount",
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
  "text": "mutation ClearCompletedTodoItemsMutation(\n  $input: ClearCompletedTodoItemsInput!\n) {\n  clearCompletedTodoItems(input: $input) {\n    removedTodoItems {\n      id\n    }\n    todoList {\n      id\n      todoItemsCount\n      completedTodoItemsCount\n    }\n  }\n}\n"
};

module.exports = batch;
