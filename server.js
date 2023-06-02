const express= require('express');
const app = express();
const port = 3001;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = mongoose.connection;
const env = require('dotenv').config();
const User = require('./models/schema.js');
const cors=require('cors');
const nodemailer = require('nodemailer');


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
    }
);
var transport=nodemailer.createTransport(
    {
      service:'gmail',
      auth:{
        user:'raccon484@gmail.com',
        pass:process.env.PASS
  
  
      }
    }
  )
// Use sessions for tracking logins


// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Serve static files from /public
// app.use(express.static(path.join(__dirname, "./frontend/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./frontend/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

// Include routes
app.post('/register', (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save()
        .then(item => {
            res.send(`User ${req.body.email} saved to database!`);
        })
        .catch(err => {
            res.status(400).send(`Unable to save to database: ${err}`);
        });

});
app.get('/users', (req, res) => {
    User.find({})
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(400).send(`Unable to fetch users: ${err}`);
        });
});
app.post('/post', (req, res) => {  
   
    
       console.log(req.body.arr[0]);
       
       const mailOptions={
        from:'raccon484@gmail.com'
         ,to:'info@redpositive.in'
        //,to:'badgerrocks383@gmail.com'
        ,subject:'User details'
        ,text:``
        } 
    
     for (person in req.body.arr){
        console.log(person);
        mailOptions.text+=`Name: ${req.body.arr[person].name}\nEmail: ${req.body.arr[person].email}\nPhone Number: ${req.body.arr[person].phonenumber}\nHobbies: ${req.body.arr[person].hobbies}\n\n`
     }
     transport.sendMail(mailOptions,function(err,info){
        if(err){
        console.log(err);
        }
        else{
        console.log('Email sent'+info.response);
        }
        })

    res.send('Post request received!');
       
});
app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id );
  
    User.findByIdAndRemove(req.params.id).then
        (item => { res.send(`User ${req.params.id} deleted!`); }
        )
        .catch(err => {
            res.status(400).send(`Unable to delete user: ${err}`);
        }
        );




});
app.put('/update/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    User.findByIdAndUpdate(req.params.id, req.body).then
        (item => { res.send(`User ${req.body.email} updated!`); }
        )
        .catch(err => {
            res.status(400).send(`Unable to update user: ${err}`);
        }
        );

});
// Catch 404 and forward to error handler




app.listen(port, () => console.log(`Example app listening on port ${port}!`));


