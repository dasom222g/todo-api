// src/mocks/handlers.js
import { setupWorker, rest } from 'msw'

const worker = setupWorker(
  rest.get('/api/cart', (req, res, ctx) => {
    return res(ctx.json({
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
    }))
  })
)

worker.start()

