/**
 * @flow
 * @relayHash 823c403aa3d67336af271e55370198c7
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type TodoListHeaderQueryResponse = {|
  +viewer: ?{|
    +todoList: ?{| |};
  |};
|};
*/


/*
query TodoListHeaderQuery(
  $todoListID: ID
) {
  viewer {
    todoList(id: $todoListID) {
      ...TodoListHeader_todoList
      id
    }
    id
  }
}

fragment TodoListHeader_todoList on TodoList {
  name
  ...AddTodoItemInput_todoList
}

fragment AddTodoItemInput_todoList on TodoList {
  id
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "todoListID",
        "type": "ID",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoListHeaderQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "todoListID",
                "type": "ID"
              }
            ],
            "concreteType": "TodoList",
            "name": "todoList",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "TodoListHeader_todoList",
                "args": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "TodoListHeaderQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "todoListID",
        "type": "ID",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "TodoListHeaderQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "todoListID",
                "type": "ID"
              }
            ],
            "concreteType": "TodoList",
            "name": "todoList",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "name",
                "storageKey": null
              },
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
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query TodoListHeaderQuery(\n  $todoListID: ID\n) {\n  viewer {\n    todoList(id: $todoListID) {\n      ...TodoListHeader_todoList\n      id\n    }\n    id\n  }\n}\n\nfragment TodoListHeader_todoList on TodoList {\n  name\n  ...AddTodoItemInput_todoList\n}\n\nfragment AddTodoItemInput_todoList on TodoList {\n  id\n}\n"
};

module.exports = batch;
