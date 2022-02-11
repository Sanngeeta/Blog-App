const express = require('express')
const checkAuth = require('../middleware/auth')
const {Registration,get_registration,Login} = require('../controller/registration.controller')
const {createPost,seeAllPost,SeePostById} = require('../controller/CreatePost')
const {likedislike,getAllLikedislike} = require('../controller/likedislike')



const router = express.Router()
// Registration 
router.get('/api/users',  get_registration)

router.post('/api/users', Registration)

router.post('/api/login/', Login)

router.get('/api/logout', (req, res) => {
    res.clearCookie('user')
    res.send({
        messge: 'Logout'
    })
})










// Create Post
router.post('/api/blogs', checkAuth, createPost)
router.get('/api/blogs', seeAllPost)
router.get('/api/:User_id', checkAuth, SeePostById)


router.post('/api/likedislike', checkAuth, likedislike)
router.get('/api/likedislike/:Post_id', getAllLikedislike)



module.exports = router