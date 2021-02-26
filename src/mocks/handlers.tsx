// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  rest.get('/api/cart', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        items: [
          {
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false
          },
          {
            userId: 1,
            id: 2,
            title: "quis ut nam facilis et officia qui",
            completed: false
          },
          {
            userId: 1,
            id: 3,
            title: "fugiat veniam minus",
            completed: false
          },
        ]
      })
    )
  })
]