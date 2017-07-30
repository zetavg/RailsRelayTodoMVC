/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type TodoListFooter_todoList = {|
  +id: string;
  +activeTodoItemsCount: ?number;
  +completedTodoItemsCount: ?number;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoListFooter_todoList",
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
  "type": "TodoList"
};

module.exports = fragment;
