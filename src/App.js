import "./scss/App.scss";
import { ReactComponent as DeleteSVG } from "./assets/img/delete.svg";
import { observer } from "mobx-react-lite";

const TodoList = observer(({ store }) => {
  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      onNewTodo(event.target.value);
      event.target.value = "";
      event.preventDefault();
    }
  };

  const onNewTodo = () => {
    let newTodoName = document.forms["add-todo-form"].newToDoName.value;
    !newTodoName.trim()
      ? alert("Нельзя добавить пустую задачу")
      : store.addTodo(newTodoName);
  };

  const setFilter = (filter) => {
    store.setFilter(filter);
  };

  return (
    <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
      <div className="row m-1 p-4">
        <div className="p-1 h1 text-center mx-auto display-inline-block">
          {/* <i className="fa fa-check bg-primary text-white rounded p-2"></i> */}
          <u className="todoHeading">ОТЛОЖИМ НА ЗАВТРА &#128564;</u>
        </div>
      </div>
      <div className="row m-1 p-3">
        <div className="col col-11 mx-auto">
          <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
            <div className="col">
              <form name="add-todo-form">
                <input
                  autoComplete="off"
                  onKeyPress={handlePressEnter}
                  className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                  type="text"
                  placeholder="На что забьём..?"
                  name="newToDoName"
                ></input>
              </form>
            </div>
            <div className="col-auto px-0 mx-0 mr-2">
              <button onClick={onNewTodo} className="btn btn-primary">
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-1 p-3 px-5">
        <button
          className={store.filterToDo === null ? "activeFilter" : ""}
          onClick={() => setFilter(null)}
        >
          Все
        </button>
        <button
          className={store.filterToDo === true ? "activeFilter" : ""}
          onClick={() => setFilter(true)}
        >
          Выполненные
        </button>
        <button
          className={store.filterToDo === false ? "activeFilter" : ""}
          onClick={() => setFilter(false)}
        >
          Невыполненные
        </button>
      </div>
      <div className="row mx-1 px-5 pb-3 w-80">
        <ul className="todoList">
          {typeof store.filterToDo === "boolean"
            ? store.todos
                .filter((todo) => todo.completed === store.filterToDo)
                .map((todo, index) => (
                  <TodoView todo={todo} id={index} key={index} store={store} />
                ))
            : store.todos.map((todo, index) => (
                <TodoView todo={todo} id={index} key={index} store={store} />
              ))}
        </ul>
      </div>
    </div>
  );
});

const TodoView = observer(({ todo, id, store }) => {
  const onToggleCompleted = () => {
    todo.completed = !todo.completed;
  };

  const onDeleteToDo = () => {
    store.todos.splice(id, 1);
  };

  return (
    <div className="todoLine">
      <li className="todoItem">
        <input
          className="checkboxInput"
          type="checkbox"
          checked={todo.completed}
          onChange={onToggleCompleted}
        />
        <span className="todoName">{todo.task}</span>
      </li>
      <DeleteSVG onClick={onDeleteToDo} className="DeleteSVG" />
    </div>
  );
});

export default TodoList;
