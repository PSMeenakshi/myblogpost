import express from "express"
const app = express();
const port = process.env.PORT || 3000;
const posts=[];

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index",{
        posts: posts
    });
});

app.get("/compose", (req,res) => {
    res.render("compose");
});

app.get("/posts/:postName",(req,res) => {
    const requestedTitle = req.params.postName.toLowerCase();

    posts.forEach(function(post){
        const storedTitle = post.title.toLowerCase();
        if(storedTitle === requestedTitle){
            res.render("post",{
                title : post.title,
                content : post.content
            })
        }
    })
});

app.get("/posts/:postName/edit", (req, res) => {
  const requestedTitle = req.params.postName.toLowerCase();

  posts.forEach(function(post) {
    if (post.title.toLowerCase() === requestedTitle) {
      res.render("edit", 
        { title: post.title,
          content: post.content
         });
    }
  });
});

app.post("/compose", (req,res) =>{
posts.push({
    title : req.body.postTitle, 
    content: req.body.postBody
});
res.redirect("/");
})

app.post("/posts/:postName/edit", (req, res) => {
  const originalTitle = req.body.originalTitle.toLowerCase(); // instead of params

  posts.forEach((post) => {
    if (post.title.toLowerCase() === originalTitle) {
      post.title = req.body.postTitle;
      post.content = req.body.postBody;
    }
  });

  res.redirect("/");
});

app.post("/posts/:postName/delete",(req,res)=>{
    const deleteTitle = req.params.postName.toLowerCase();
 const index = posts.findIndex(post => post.title.toLowerCase() === deleteTitle);
 if(index!== -1){
    posts.splice(index, 1);
 }
  res.redirect("/");
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});