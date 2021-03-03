// src/mocks/handlers.js
import { rest } from 'msw'
import { TodoListType } from '../type/type'

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
    let list:string | null = localStorage.getItem(KEY)
    if(list && typeof list === 'string') list = JSON.parse(list)
    return res(
      ctx.status(200),
      ctx.json(list)
    )
  }),

  rest.get('/api/todos/:itemId', (req, res, ctx) => {
    const itemId = Number(req.params.itemId)
    const store:string | null = localStorage.getItem(KEY)
    if(store) {
      const data: TodoListType[] = JSON.parse(store)
      const itemData = data.filter(item => item.id === itemId)

      return res(
        ctx.status(200),
        ctx.json(itemData[0])
      )
    } else {
      return res(
        ctx.status(404)
      )
    }
  }),

  rest.post('/api/todos', (req, res, ctx) => {
    if (typeof req.body === 'string') {
      const store: string | null = localStorage.getItem(KEY)
      if (store === null) {
        const data = JSON.stringify([JSON.parse(req.body)])
        localStorage.setItem(KEY, data)
      } else {
        const data = JSON.stringify([ ...JSON.parse(store), JSON.parse(req.body) ]);
        localStorage.setItem(KEY, data)
      }
    }

    return res(
      ctx.json({
        [KEY]: req.body
      }),
      ctx.status(200)
    )
  }),

  rest.put('/api/todos/:itemId', (req, res, ctx) => {
    const itemId = Number(req.params.itemId)
    if(req.body && typeof req.body === 'string') {
      const data = JSON.parse(req.body)
      const {id, title, description, isComplete} = data
      const store: string | null = localStorage.getItem(KEY)
      if (store) {
        const data: TodoListType[] = [...JSON.parse(store)]
        const updateData = data.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              id,
              title,
              description,
              isComplete
            }
          }
          return ({...item})
        })

        localStorage.setItem(KEY, JSON.stringify(updateData))

        return res(
          ctx.status(200),
          ctx.json(updateData)
        )
      }
    } else {
      return res(
        ctx.status(404)
      )
    }
  }),

  rest.delete('/api/todos/:itemId', (req, res, ctx) => {
    const itemId = Number(req.params.itemId)
    const store:string | null = localStorage.getItem(KEY)
    if(store && typeof store === 'string') {
      const data: TodoListType[] = JSON.parse(store)
      console.log('itemId', typeof itemId)
      const removeData = data.filter(item => item.id !== itemId)
      localStorage.setItem(KEY, JSON.stringify(removeData))

      return res(
        ctx.status(200),
        ctx.json(removeData)
      )
    }
  }),
]