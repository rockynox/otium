import {todosRef} from "../firebase";

export const FETCH_TODOS = 'FETCH_TODOS';

export const addToDo = newToDo => async dispatch => {
  todosRef.push().set(newToDo);
};

export const completeToDo = completedToDo => async dispatch => {
  todosRef.child(completedToDo).remove();
};

export const fetchToDos = () => async dispach => {
  todosRef.on("value", snapshot => {
    dispach({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};
