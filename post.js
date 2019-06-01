//jshint esversion:6
const randomstring = require("randomstring");

module.exports = class PostManager {
  constructor() {
    this.posts = [];
  }

  findAll() {
    return this.posts;
  }

  findById(id) {
    return this.posts.find(e => {
      return e.id === id;
    });
  }

  create(title, content) {
    const post = {};
    post.id = randomstring.generate(12);
    post.title = title;
    post.content = content;
    this.posts.push(post);
    console.log(post);
  }
};
