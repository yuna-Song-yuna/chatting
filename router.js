module.exports = function(app){
    app.get('/', function(req, res){
        res.render('chat')
    })

    // app.get('/chat', function(req, res){
    //     res.render('chat')
    // })
}