/**
 * @flow
 * @relayHash 7e8bc2d28815ae8b569d0fc6992204aa
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
query TodoListHeaderQuery {
  viewer {
    todoList {
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
    "argumentDefinitions": [],
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
            "args": null,
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
    "argumentDefinitions": [],
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
            "args": null,
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
  "text": "query TodoListHeaderQuery {\n  viewer {\n    todoList {\n      ...TodoListHeader_todoList\n      id\n    }\n    id\n  }\n}\n\nfragment TodoListHeader_todoList on TodoList {\n  name\n  ...AddTodoItemInput_todoList\n}\n\nfragment AddTodoItemInput_todoList on TodoList {\n  id\n}\n"
};

module.exports = batch;
