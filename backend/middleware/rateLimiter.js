import ratelimit from "../config/upstash.js"

const rateLimiter=async(req,res,next)=>{
//per user=>john,jen
try {
  const {success}=await ratelimit.limit("my-rate-limit")

  if(!success){
    return res.status(429).json({
      message:"Too many request,Please try again later",

    })
  }
  next()
} catch (error) {
  console.log("Rate limit error",error);
  next(error);
}
}

export default rateLimiter;