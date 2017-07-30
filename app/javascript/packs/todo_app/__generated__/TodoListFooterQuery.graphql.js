/**
 * @flow
 * @relayHash 1f97f3f25a086bb085fa2d55935555b1
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type TodoListFooterQueryResponse = {|
  +viewer: ?{|
    +todoList: ?{| |};
  |};
|};
*/


/*
query TodoListFooterQuery {
  viewer {
    todoList {
      ...TodoListFooter_todoList
      id
    }
    id
  }
}

fragment TodoListFooter_todoList on TodoList {
  id
  activeTodoItemsCount
  completedTodoItemsCount
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoListFooterQuery",
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
                "name": "TodoListFooter_todoList",
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
  "name": "TodoListFooterQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "TodoListFooterQuery",
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
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "activeTodoItemsCount",
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
  "text": "query TodoListFooterQuery {\n  viewer {\n    todoList {\n      ...TodoListFooter_todoList\n      id\n    }\n    id\n  }\n}\n\nfragment TodoListFooter_todoList on TodoList {\n  id\n  activeTodoItemsCount\n  completedTodoItemsCount\n}\n"
};

module.exports = batch;
