import Pusher from "pusher"

const pusher = new Pusher({
  appId: "1509731",
  key: "2daa1e104f95a54fd72e",
  secret: "f02f74b5d538c0c915bf",
  cluster: "us3",
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
        
        pusher.trigger("drawer-channel", "drawer-event", {
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