import { NextApiResponseSocketIo } from "@/types"
import { Server as HttpServer } from "http"
import { NextApiRequest } from "next"
import { Server as IoServer } from "socket.io"

// We need to disable the body parser to handle the raw request
// https://nextjs.org/docs/api-routes/api-middlewares#disabling-the-body-parser
export const config = { api: { bodyParser: false } }

const ioHandler = (req: NextApiRequest, res: NextApiResponseSocketIo) => {
  // Ensure the Socket.IO server is initialized only once
  if (!res.socket.server.io) {
    const path = "/api/socket/io"
    const httpServer: HttpServer = res.socket.server as any
    const io = new IoServer(httpServer, {
      path: path,
      addTrailingSlash: false,
    })
    res.socket.server.io = io
  }
  res.end()
}

export default ioHandler
