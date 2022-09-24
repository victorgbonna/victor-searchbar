import { pusher } from "../../../lib/pusherIndex";

export default async function handler(req, res){
    const {socket_id, channel_name, username}= req.body
    const randomString= Math.random().toString(36).slice(2).length

    const presenceData={
        user_id: randomString,
        user_info:{
            username
        }
    }
    try{
        const auth= pusher.authenticateUser(socket_id, channel_name, presenceData)
    } catch (error){
        console.error(error)
    }
    
}