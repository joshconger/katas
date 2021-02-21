const Timeline = require('./timeline.js');

test('test Timeline constructor with no Posts', () => {
  const name = 'Alice';

  const timeline = new Timeline(name);

  expect(timeline).toEqual({ name, posts: [] });
});

test('test Timeline constructor with one Post', () => {
  const name = 'Alice';
  const content = 'hello';
  const secondsAgo = 15;

  const timeline = new Timeline(name);
  timeline.publish(content, secondsAgo);

  expect(timeline).toEqual({ name, posts: [{ content, secondsAgo }] });
});

test('test personal Timeline view method', () => {
  const name = 'Alice';
  const content = 'I love the weather today.';

  const timeline = new Timeline(name);
  timeline.publish(content, 15);

  const personalView = timeline.viewPersonal();

  expect(personalView).toBe(content);
});

test('test Timeline second person view method', () => {
  const name = 'Bob';
  const content1 = 'Darn! We lost!';
  const content2 = 'Good game though.';

  const timeline = new Timeline(name);
  timeline.publish(content1, 120);
  timeline.publish(content2, 60);
  const secondPersonView = timeline.viewSecondPerson();

  const expected = `${content2} (a minute ago)\n${content1} (2 minutes ago)`;

  expect(secondPersonView).toBe(expected);
});
