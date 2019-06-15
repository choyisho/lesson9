//jshint esversion:6
require('./config.js');
const mongoose = require('mongoose');
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const dbname = 'blog';
const url = `mongodb+srv://${username}:${password}@cluster0-ugetv.mongodb.net/${dbname}`;

console.log(url);

mongoose.connect(url, {userNewUrlParser:true}) ;
mongoose.connection.once('open', () =>{
  console.log('Connection succeeded!!!!!!');
});

const postSchema = new mongoose.Schema({
  // id: String,
  title: String,
  content: String
});

const Post = mongoose.model('model', postSchema);

module.exports = class PostManager{
  findAll(callback){
    Post.find((err, data) => {
      data.forEach(elem => elem.id = elem._id.toString());
      callback(err, data);
    });
  }

  findById(id, callback){
    Post.find({_id:id}, (err, data) => callback(err, data));
  }

  create(title, content, callback) {
    const post = new Post({title, content});
    post.save((err, data) => {
      if (data) {
        console.log('Post created!!!!!', JSON.stringify(data));
        callback(err, data);
      }
    });
  }

};

// const randomstring = require("randomstring");
// const sqlite = require("sqlite3");
// const Sequelize = require("Sequelize");
// const sequelize = new Sequelize({
//   dialect : 'sqlite',
//   storage : 'blog.db'
// });
// const Model = Sequelize.Model;
// class Post extends Model {}

//DB define
// posts:id:TEXT,title:TEXT,conten:TEXT
//
// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
// const dbName = 'blog';
// let db;
// const ObjectId = require('mongodb');

// Post.init({
//   id : {
//     type: sequelize.STRING,
//     allowdull: false,
//     primarykey: true
//   },
//   title : {
//     type: sequelize.STRING
//   },
//   content : {
//     type: sequelize.STRING
//   }
//   }, {
//     sequelize,
//     modelName: 'post'
// });
//
// Post.sync().then(() => {
//   console.log("Table Created!!!!");
// });


//
// module.exports = class PostManager {
  // constructor() {
  //   this.db = new sqlite.Database("blog.db");
  //   this.db.run(
  //     'create table if not exists posts(id TEXT, title TEXT, content TEXT)', err => {
  //       if (err) {
  //         console.log(err);
  //       }
  //     }
  //   );
  // }
  //
  // constructor() {
  //   MongoClient.connect(url, {
  //     userNewUrlParser: true
  //   }, (err, client) => {
  //     if (err) {
  //       console.error('FAILED to connect DB', err);
  //     } else {
  //       this.db = client.db('blog');
  //     }
  //   });
  // }
  //
  // findAll(callback) {
  //   this.db.collection('posts').find({}).toArray((err, data) => {
  //     data.forEach(elem => elem.id = elem._id.toString());
  //     callback(err, data);
  //   });
  // }
  //
  // findById(id, callback) {
  //   this.db.collection('posts').find( {
  //     _id : ObjectId(id)
  //   }).toArray((err, data) => {
  //     if (data[0]) {
  //       data[0].id = data[0]._id.toString();
  //     }
  //     callback(err, data[0]) ;
  //   });
  // }


  // finAll(callback) {
  //   Post.findall().then(post => {
  //     callback(null,post);
  //   });
  // }
  //
  // findById(id, callback){
  //   Post.findById({
  //     where: {id}
  //   }).then(posts => callback(null, posts[0]));
  // }
  //
  // create(title, content, callback) {
  //   this.db.collection('posts').insertMany({
  //     title,
  //     content
  //   }, (err, result) => {
  //     console.log(JSON.stringify(result));
  //   });
  // }


  // create(title, content, id) {
  //   Post.create({
  //     id: randomstring.generate(),
  //     title, content
  //   }).then(post => callback());
  // }
  // findAll(cb) {
  //   this.db.all("select * from posts", (err, rows) => {
  //     cb(err, rows);
  //   });
  // }

  // findById(id, cb) {
  //   this.db.all(`select * from posts where id = '${id}'`, (err, row) => {
  //     cb(err, row);
  //   });
  // }

  // create(title, content, cb) {
  //   const id = randomstring.generate(12);
  //   this.db.run(
  //     `insert into posts(id ,title, content) values('${id}','${title}','${content}')`, err => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         cb(err);
  //       }
  //     }
  //   );
  // }
//
// };
