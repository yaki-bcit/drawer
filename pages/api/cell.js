import Pusher from "pusher"

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
})

export default async function handler(req, res) {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { cell } = req.body
        console.log('post cell', cell)

        cell.value = cell.value === "FFFFFF" ? "000000" : "FFFFFF"
        
        await pusher.trigger("drawer-channel", "drawer-event", {
          cell
        })
        res.json({ cell })
      } catch (error) {
        res.status(400).json({ error })
      }
      break
    default:
      res.setHeader('Allow', ['PUSH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}