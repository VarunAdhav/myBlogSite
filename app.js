const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');

const app = express();

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

// let today = new Date();
let data = [
    {"Title":"First Blog" , 
      "Blog":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."  }
];
// let blogs = ["My First Blog" , "My First Blog"];
// let timeStamps = ["00:00" , "01:20"];


// let option = {
//     weekday : "long",
//     year : "numeric",
//     month : "long",
//     day : "numeric"
// }

// let opt = {
//     hour : "numeric", 
//     minute : "numeric"
// }

// let date = today.toLocaleDateString("en-IN" , opt);

app.post("/write" , (req , res)=>{
    let newBlog = req.body.blog;
    let newTitle = req.body.title;
    let json = {
        "Title": newTitle,
        "Blog":  newBlog
    }
    data.push(json);
    // timeStamps.push(today.toTimeString().slice(0,5));
    // console.log("Time:",date);

    console.log("\nSuccesfully added the: ",json);
    res.redirect("/home");
});

app.get("/write" , (req , res)=>{
    console.log("into /write");
    res.render("write", {title:"Today's Blogszz"});
});

app.get("/home" , (req , res)=>{
    res.render("home" , {title:"Blogszz", data:data});
});

app.get("/home/:Title" , (req , res)=>{
    var Blog;
    let title = req.params.Title;
    data.forEach((Data)=>{
        if(_.lowerCase(Data.Title) == _.lowerCase(title)){
            Blog = Data.Blog;
            console.log("Match Found" , Data.Title , Blog);       
            res.render("blogs" ,{
                title: title,
                Blog:Blog
            });
        }
    });
    // console.log(req.params.Title);
});

app.get("/" , (req , res)=>{
    res.redirect("/home");
});
 
app.get("/about" , (req , res)=>{
    res.render("about" , {title: "About"});
});


app.listen(3000 , ()=>{
    console.log("Listening @ port 3000...");
});