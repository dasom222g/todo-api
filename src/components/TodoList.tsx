import React from 'react'
import { Link } from 'react-router-dom';
import {GoCheck} from 'react-icons/go'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'
import { byIdType, NormalDataType } from '../type/type'

type TodoListProps = {
  todoList: NormalDataType<{}>,
}
function TodoList({todoList}: TodoListProps) {
  const {allIds} = todoList.todos
  const byId: typeof byIdType = todoList.todos.byId

  return (
    <section>
      <ul className="todo__list">
        {allIds.map(id => {
          return (
            <li key={id} className="todo__item">
              <div className='todo__content complete'>
                <div className="todo__item-check">
                  <label>
                    <input
                      type="checkbox"
                      // checked={item.isComplete ? true : false}
                      // onChange={() => completeTodo(item)}
                    />
                    <i className="todo__item-check-icon" />
                    <GoCheck className="todo__item-check-icon complete" />
                    <span className="todo__content-text">{byId[id].title}</span>
                  </label>
                </div>
                <div className="todo__item-buttonarea">
                    <Link
                      className="todo__item-button"
                      to={`/update/${id}`}
                      >
                      <TiEdit
                        className="todo__item-button-icon update"
                      />
                    </Link>
                    <button
                      type="button"
                      className="todo__item-button"
                      // onClick={() => removeTodo(item.id)}
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

export default TodoList
