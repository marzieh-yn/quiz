var express = require('express');
var router = express.Router();
var app = express();
var cookieParser = require('cookie-parser');
const knex=require("../client");// connection database


/* GET users listing. */
router.get("/", (req, res) => {
    // if ()
    res.render("login", { model: {} });
});
router.post("/addClucks/:username",(req,res)=>{ // this route will address post request comming from the form when submit button is pressed. This is defined in a form tag : method and action
//     console.log(req.params.username);
// console.log(req.params.id);
    const updatedPost={
        username:req.params.username,
        content: req.body.content,
        image_url: req.body.image_url
    };
    knex("user")
        .where("username",req.params.username)
        .update(updatedPost).returning('*')
        .then(users=>{
            // To show the data that is saved in a db
            const [post]=users//👈🏻 This is a new line to destructure array
            console.log(post);
            res.redirect(`/showsCluck/${post.id}`) // redirecting our server to display the show.ejs(Show page). Which we will be building now.
        })
});


router.get('showsCluck/:id',(req, res, next) => {
    //response.send will pass string to the page
    // response.send(`welcome`);
    // console.log(req.cookies.username);
    const id=req.params.id;


    knex('user')
        .where("id",id)
        .first()
        .then( user=>{
            const [post]=user
            if(post){
                res.render("views/index",{cluckr: post, username: req.cookies.username})
            }else{
                res.redirect("/home_show")
            }
        })
});

// I just did from part 1 to part 5

app.use(cookieParser());

module.exports = router;