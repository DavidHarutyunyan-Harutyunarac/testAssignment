import { makeObservable, observable, computed, action } from "mobx";

class ObservableTodoStore {
  todos = [{
    task: 'Не взять на работу Давита',
    completed: false,
  }];
  filterToDo = null;

  constructor() {
    makeObservable(this, {
      todos: observable,
      filterToDo: observable,
      completedTodosCount: computed,
      addTodo: action,
      setFilter: action,
    });
  }

  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
    });
  }

  setFilter(filter) {
    this.filterToDo = filter;
  }
}

const observableTodoStore = new ObservableTodoStore();

export default observableTodoStore;