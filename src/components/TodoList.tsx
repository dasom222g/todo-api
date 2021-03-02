import React from 'react'
import { Link } from 'react-router-dom';
import {GoCheck} from 'react-icons/go'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'
import { TodoListType } from '../type/type'

type TodoListProps = {
  todoList: TodoListType[],
  completeTodo: (id: number) => void,
  removeTodo: (id: number) => void,
  selectTodo: (item: TodoListType) => void
}

function TodoList({todoList, completeTodo, removeTodo, selectTodo}: TodoListProps) {

  return (
    <section>
      <ul className="todo__list">
        {todoList.map(item => {
          return (
            <li key={item.id} className="todo__item">
              <div className={item.isComplete ? 'todo__content complete' : 'todo__content'}>
                <div className="todo__item-check">
                  <label>
                    <input
                      type="checkbox"
                      checked={item.isComplete ? true : false}
                      onChange={() => completeTodo(item.id)}
                    />
                    <i className="todo__item-check-icon" />
                    <GoCheck className="todo__item-check-icon complete" />
                    <span className="todo__content-text">{item.title}</span>
                  </label>
                </div>
                <div className="todo__item-buttonarea">
                    <Link
                      className="todo__item-button"
                      to={`/update/${item.id}`}
                      onClick={() => selectTodo(item)}
                      >
                      <TiEdit
                        className="todo__item-button-icon update"
                      />
                    </Link>
                    <button
                      type="button"
                      className="todo__item-button"
                      onClick={() => removeTodo(item.id)}
                    >
                      <RiCloseCircleLine
                        className="todo__item-button-icon delete"
                      />
                    </button>
                  </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

TodoList.defaultProps = {
  selectTodo: () => {}
}

export default TodoList
