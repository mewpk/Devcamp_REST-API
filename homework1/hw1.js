const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const users = require('./user.json')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/user', function (req, res, next) {
    return res.status(200).json({
        code: 1,
        message: 'OK',
        data: users
    })
});




app.post('/user', function (req, res, next) {
    let user = {}

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.id = users.length + 1
    user.position = req.body.position;
    user.phone = req.body.phone;
    user.email = req.body.email;
    users.push(user);
    console.log('Users :', user.first_name, 'Created!')
    return res.status(201).json({
        code: 1,
        message: 'OK',
        data: users
    });
});



app.put('/user/:id', function (req, res, next) {
    const replaceId = req.params.id;
    const position = users.findIndex(function (val) {
        return val.id == replaceId;
    });
    console.log(users[position]);
    try {
        users[position].first_name = req.body.first_name;
        users[position].last_name = req.body.last_name;
        users[position].position = req.body.position;
        console.log('Users :', replaceId, 'Updated!')
        return res.status(200).json({
            code: 1,
            message: 'OK',
            data: users
        });
    } catch (error) {
        res.status(404).send('Not Found');
    }
});



app.delete('/user/:id', function (req, res, next) {
    const removeId = req.params.id;
    try {
        const position = users.findIndex((val) => {
            return val.id == removeId;
        });
        users.splice(position, 1);
        console.log('Users :', removeId, 'Deleted!')
        return res.status(200).json({
            code: 1,
            message: 'OK',
            data: users
        })
    } catch (error) {
        res.status(404).send('Not Found');
    }
});



app.listen(3000, () => {
    console.log("Server Start ===> 3000");
})