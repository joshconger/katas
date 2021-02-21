const moment = require('moment');
const Post = require('./post.js');

class Timeline {
  constructor(name, posts) {
    this.name = name;
    this.posts = !posts ? [] : posts;
  }

  getFlattenedPosts() {
    const { name } = this;
    return this.posts.map((post) => ({ name, ...post }));
  }

  // TODO:: move out to a PostSorter class to be used by Timeline and Wall
  getPostsDescending() {
    return this.posts.sort((a, b) => a.secondsAgo - b.secondsAgo);
  }

  publish(content, secondsAgo) {
    const post = new Post(content, secondsAgo);
    this.posts.push(post);
  }

  // TODO:: rename to getFirstPersonView()
  viewPersonal() {
    const posts = this.getPostsDescending();
    const postsContentOnly = posts.map((post) => post.content);

    return postsContentOnly.join('\n');
  }

  // TODO:: rename to getSecondPersonView()
  viewSecondPerson() {
    const posts = this.getPostsDescending();
    const postsFormatted = posts.map((post) => {
      // TODO:: move out to a TimeFormatter class to be used by Timeline and Wall
      const secondsAgoText = moment().subtract(post.secondsAgo, 's').fromNow();

      return `${post.content} (${secondsAgoText})`;
    });

    return postsFormatted.join('\n');
  }
}

module.exports = Timeline;
