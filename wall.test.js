const Timeline = require('./timeline.js');
const Wall = require('./wall.js');

const secondsPerMinute = 60;

test('test Wall view method', () => {
  const alice = 'Alice';
  const aliceContent = 'I love the weather today';
  const aliceTimeline = new Timeline(alice);
  aliceTimeline.publish(aliceContent, 5 * secondsPerMinute);

  const bob = 'Bob';
  const bobContent1 = 'Darn! We lost!';
  const bobContent2 = 'Good game though.';
  const bobTimeline = new Timeline(bob);
  bobTimeline.publish(bobContent1, 2 * secondsPerMinute);
  bobTimeline.publish(bobContent2, 1 * secondsPerMinute);

  const charlie = 'Charlie';
  const charlieContent = "I'm in New York today! Anyone wants to have a coffee?";
  const charlieTimeline = new Timeline(charlie);
  charlieTimeline.publish(charlieContent, 15);

  const wall = new Wall([aliceTimeline, bobTimeline, charlieTimeline]);
  const charlieSees = wall.view();

  const expected = `${charlie} - ${charlieContent} (a few seconds ago)\n`
    + `${bob} - ${bobContent2} (a minute ago)\n`
    + `${bob} - ${bobContent1} (2 minutes ago)\n`
    + `${alice} - ${aliceContent} (5 minutes ago)`;

  expect(charlieSees).toBe(expected);
});
