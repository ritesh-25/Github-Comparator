const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// Search Input
// const searchUser = document.getElementById('searchUser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const item = [];
const item2=[];
app.get("/",function(req,res){

res.render("index",{newListItems: item});

});
//Initialize GitHub
class GitHub{
    constructor(){
        this.client_id = "b538be69eaef6f6b6559";
        this.client_secret = "0f478dbe8a73c409c92c44a5d9aae98e7f4efd8d";
        this.repos_count = 5;
        this.repos_sort = 'created: asc'
    }
    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`)
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return {
            profile,
            repos
        }
    }
}
const github = new GitHub;
app.post("/",function(req,res){
const userText = req.body.username;
if(item2.includes(userText)===false){
item2.push(userText);
if(userText !== ''){
            // Make http call
            github.getUser(userText)
            .then(data => {
                if(data.profile.message !== "Not Found"){
                   item.push(data.profile);
                   console.log(data.profile);
                }
            });
            // console.log(userText);
}
}
// console.log(item.length);
res.redirect("/");
});


app.listen(process.env.PORT||5050, function() {
    console.log("Server started on port 3000");
});
  
