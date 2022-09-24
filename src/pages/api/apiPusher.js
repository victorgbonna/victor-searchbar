import { pusher } from "../../../lib/pusherIndex";


export default async function handler(req, res){
    const {username, message}= req.body    
    //pprefix your channel name with presence-
    await pusher.trigger('presence-notification', 'notify-update',{
        message, username
    })
    res.json({status:200})
}