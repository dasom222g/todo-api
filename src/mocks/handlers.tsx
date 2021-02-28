// src/mocks/handlers.js
import { rest } from 'msw'

type todoListType = {
  id: number,
  title: string
}

const SAMPLE_ITEM:string = 'sampleItem'

const todoList:todoListType[] = [
  {
    id: 1,
    title: 'test1',
  },
  {
    id: 2,
    title: 'test2',
  },
  {
    id: 3,
    title: 'test3',
  }
]

export const handlers = [
  // 데이터 준비
  rest.get('/api/get-item', (req, res, ctx) => {
    let item:string | null = localStorage.getItem(SAMPLE_ITEM)
    if(item && typeof item === 'string') item = JSON.parse(item)
    return res(
      ctx.status(200),
      ctx.json(item)
    )
  }),

  rest.post('/api/post-item', (req, res, ctx) => {
    if (typeof req.body === 'string') localStorage.setItem(SAMPLE_ITEM, req.body)
    return res(
      ctx.json({
        sampleItem: req.body
      }),
      ctx.status(200)
    )
  }),

  rest.get('/api/get-todos', (req, res, ctx) => {
    // let todoList:string | null = localStorage.getItem(SAMPLE_ITEM)
    // if(todoList && typeof todoList === 'string') todoList = JSON.parse(todoList)
    return res(
      ctx.status(200),
      ctx.json(todoList)
    )
  }),
]