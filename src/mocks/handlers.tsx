// src/mocks/handlers.js
import { rest } from 'msw'

type SampleDataType = {
  id: number,
  title: string
}

const KEY:string = 'TODO_LIST'

const sampleData:SampleDataType[] = [
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
    let item:string | null = localStorage.getItem(KEY)
    if(item && typeof item === 'string') item = JSON.parse(item)
    return res(
      ctx.status(200),
      ctx.json(item)
    )
  }),

  rest.post('/api/post-item', (req, res, ctx) => {
    if (typeof req.body === 'string') localStorage.setItem(KEY, req.body)
    return res(
      ctx.json({
        sampleItem: req.body
      }),
      ctx.status(200)
    )
  }),

  rest.get('/api/get-data', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(sampleData)
    )
  }),
  rest.get(`/api/get-data/1`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(sampleData[0])
    )
  }),

  // todo!!
  rest.get('/api/todos', (req, res, ctx) => {
    let item:string | null = localStorage.getItem(KEY)
    if(item && typeof item === 'string') item = JSON.parse(item)
    return res(
      ctx.status(200),
      ctx.json(item)
    )
  }),

  rest.post('/api/todos', (req, res, ctx) => {
    if (typeof req.body === 'string') localStorage.setItem(KEY, req.body)
    return res(
      ctx.json({
        [KEY]: req.body
      }),
      ctx.status(200)
    )
  }),

]