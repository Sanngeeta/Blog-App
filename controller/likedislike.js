const knex = require('../model/table')
const {seeAllPost} = require('./CreatePost')



likedislike = (req, res) => {
    if(![1,0].includes(req.body.Like) || ![1,0].includes(req.body.Dislike)){
        return res.send({message:'Invalid liked'})}
    if (req.userData.id === null) {
        res.json({
            status: 'error',
            message: 'User has been logged out.Please login again'})
    } else {
        knex('Post').where('Post_id', req.body.Post_id)
            .then((post) => {
                if (post.length === 0) {
                    res.json({
                        status: 'error',
                        message: 'Post does not exits'
                    })
                } else {
                    knex.select('*').from('likedislike').where({
                            User_id: req.userData.id,
                            Post_id: req.body.Post_id
                        })
                        .then((likepost) => {
                            if (likepost.length > 0) {
                                res.send({
                                    message: 'You Already Liked / Disliked'
                                })
                            } else {

                                const likedislikePost = {
                                    User_id: req.userData.id,
                                    Post_id: req.body.Post_id,
                                    Like: req.body.Like,
                                    Dislike: req.body.Dislike
                                }

                                knex('likedislike').insert(likedislikePost)
                                    .then((data) => {
                                        knex.select("Post.Title").from('likedislike').join('Post', 'likedislike.Post_id', 'Post.Post_id').where("likedislike.Post_id", req.body.Post_id)
                                            .then((d) => {
                                                console.log(d);
                                                res.json({
                                                    liked: 'like added',
                                                    likePost: d
                                                })

                                            })

                                    })
                            }

                        })



                }


            })

    }

}





getAllLikedislike = (req, res) => {
    console.log(req.params)
    knex('likedislike')
    .innerJoin("Post", "Post.Post_id", "=", "likedislike.Post_id")
    .innerJoin('Users', 'Users.id', 'likedislike.User_id')
    .select("*").where('likedislike.Post_id', '=', req.params.Post_id)
        .then((getdata) => {
            console.log(getdata)
            res.json({
                succes: true,
                status: 200,
                message: 'Like Dislike Post',
                data: getdata
            })

        }).catch((err) => {
            console.log(err)
            res.json({
                status: 403,
                error: 'Opps Something Problem'
            })
        })
}





module.exports = {
    likedislike,
    getAllLikedislike
}
