// src/mocks/handlers.js
import { rest } from 'msw'

const todosKey:string = 'TODO_LIST'

export const handlers = [
  // 데이터 준비
  rest.get('/api/get-todos', (req, res, ctx) => {
    const todoList:string | null = localStorage.getItem(todosKey)
    return res(
      ctx.status(200),
      ctx.json(todoList)
    )
  }),

  rest.post('/api/post-todos', (req, res, ctx) => {
    if (typeof req.body === 'string') localStorage.setItem(todosKey, req.body)
    return res(
      ctx.json({
        todoList: req.body
      }),
      ctx.status(200)
    )
  })
]