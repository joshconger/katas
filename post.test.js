const Post = require('./post.js');

test('test Post constructor', () => {
  const content = 'hello';
  const secondsAgo = 15;

  const post = new Post(content, secondsAgo);

  expect(post).toEqual({ content, secondsAgo });
});
