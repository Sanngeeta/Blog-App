const knex=require('../model/table')



createPost=(req,res)=>{
    const createdPost={
        User_id:req.userData.id,
        Title:req.body.Title,
        Description:req.body.Description
    }
    knex('Post').insert(createdPost)
    .then((data)=>{
        console.log(data)
        knex.select('*').from('Post').where('Post_id',data)
        .then((postData)=>{
            res.status(200).json({
                succes:1,
                message:'Blog Uploaded sussesfully!',
                new_blog:postData
            })
            
        }).catch((err)=>{
            res.status(401).json({
                succes:0,
                message:'Uploaded Failed'
            })
        })
    }).catch((err)=>{
        res.status(403).json({
            succes:0,
            message:'Something is wrong,Its Failed'
        })
        
    })    
}




seeAllPost=(req,res)=>{
    knex.select('*').from('Post')
        .then((getData)=>{
            countPost=getData.length
            res.status(201).json({
                succes:1,
                message:'See All Post',
                total_post:countPost,
                all_post:getData
            })
        }).catch((err)=>{
            res.status(406).json({
                succes:0,
                message:'Server Not Found!'
            })
            

        })
}





SeePostById=(req,res)=>{
    knex.select("*").from("Post").where('User_id', '=',req.userData.id)
    .then((getData)=>{
        console.log(getData)
            res.status(201).json({
                succes:1,
                message:'See All Post',
                all_post:getData
            })
        }).catch((err)=>{
            console.log(err)
            res.status(406).json({
                succes:0,
                message:'Server Not Found!'
            })
            

        })
}











module.exports={
    createPost,
    seeAllPost,
    SeePostById
}
