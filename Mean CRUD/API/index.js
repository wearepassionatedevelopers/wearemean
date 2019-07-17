const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const app = express();
//const fs = require('fs');

app.use(express.json());

//let users = JSON.parse(fs.readFileSync(`${__dirname}/./data/users.json`));

// app.get('/api/getAllUsers', (req, res) => {

//     res.status(200).json(users);
// });

//view all/ view by id
app.get('/api/getUser/:id?', (req, res) => {
    //console.log("singleuser");
    //console.log(req);
    const id = req.params.id;
    if (id) {
        let _users = [];
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbo = db.db("mean_crud");
            let myobj = { _id: id };
            console.log(myobj);
            dbo.collection("users").find({ _id: id }, { projection: { _id: 0 } }).toArray(function (err, result) {
                if (err) {
                    res.status(500).json('Please try again later');
                    throw err;
                }
                console.log(result);
                _users = result;
                db.close();
                res.status(200).json(_users);
            });
        });
    }
    else {
        let _users = [];
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbo = db.db("mean_crud");
            //let myobj = { name: "Company Inc", address: "Highway 37" };
            dbo.collection("users").find({}).toArray((err, result) => {
                if (err) {
                    res.status(500).json('Please try again later');
                    throw err;
                }
                console.log(result);
                _users = result;
                db.close();
                res.status(200).json(_users);
            });
        });
    }
});
//adds a single user
app.post('/api/addUser', (req, res) => {
    let inputReqBody = req.body;
    console.log(inputReqBody);
    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.log('anfdod');
            throw err;
        }
        let dbo = db.db("mean_crud");
        console.log(inputReqBody);
        dbo.collection("users").insertOne(inputReqBody, function (err, res1) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
            res.end("1 document inserted");
        });
    });
});
//updates a single user
app.post('/api/editSingleUser/:id', (req, res) => {
    const id = req.params.id;
    //console.log(req.body);
    let inputReqBody = req.body;
    if (id) {
        // //console.log(users);
        // //const singleUser = users.find(user => user._id ===id);
        // users = users.filter(x => x._id !== id);

        // //console.log(users1);
        // //console.log(users.length);
        // //console.log(users1.length);
        // users.push(inputReqBody);
        // //console.log(users1.length);
        // res.status(200).json(users);
        MongoClient.connect(url, (err, db) => {
            if (err) {
                console.log('anfdod');
                throw err;
            }
            let dbo = db.db("mean_crud");
            console.log(inputReqBody);
            dbo.collection("users").findOneAndReplace({ _id: id }, inputReqBody, (err, res1) => {
                if (err) throw err;
                console.log(res1);
                console.log("1 document updated");
                db.close();
                res.end("1 document updated");
            });
        });
    }
});

//deletes a single user
app.post('/api/deleteSingleUser/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                console.log('anfdod');
                throw err;
            }
            let dbo = db.db("mean_crud");
            //console.log(inputReqBody);
            dbo.collection("users").deleteOne({ _id: id }, (err, res1) => {
                if (err) throw err;
                console.log(res1);
                console.log("1 document delete");
                db.close();
                res.end("1 document delete");
            });
        });

    }
});


app.listen(3020, () => {
    console.log('too cool');
})