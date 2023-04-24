module.exports = async(req,res,nxt)=>{
    try {
        if(req.session.isAdmin) return nxt();
        console.log("not admin")
    } catch (error) {
        console.log(error.message)
    }

}