const user = require("../controllers/user.controller.js");
module.exports = app => {
    const user = require("../controllers/user.controller.js");

    const router = require("express").Router();
    const client_id = process.env.client_id
    const client_secret = process.env.client_secret
    const redirect_uri = process.env.redirect_uri

    router.get("/spotify/login",function (req,res) {
        let url = 'https://accounts.spotify.com/authorize?'
            let params = "client_id=" + client_id + "&client_secret=" + client_secret + "&redirect_uri=" + redirect_uri +
            "&scope=user-library-read user-read-private playlist-read-collaborative playlist-read-private playlist-modify-public playlist-modify-private user-top-read user-follow-read user-follow-modify user-library-modify playlist-modify-public&response_type=code&show_dialog=true"
        res.redirect(url + params)
    })

    // Create a new User
    router.get("/spotify/callback/", user.scode);

    router.get("/spotify/refresh_token/:username", user.refresh);

    router.get("/spotify/logout",function (req,res) {
        res.clearCookie("access_token").clearCookie("username")
        res.redirect('/')
    })

    router.get("/spotify/global_viral/", user.globalviral);

    // // Retrieve all User
    // router.get("/", user.findAll);
    //
    //
    // // Retrieve a single User with id
    // router.get("/:id", user.findOne);
    //
    // // Update a User with id
    // router.put("/:id", user.update);
    //
    // // Delete a User with id
    // router.delete("/:id", user.delete);


    app.use('/', router);
};