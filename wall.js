const moment = require('moment');

class Wall {
  constructor(timelines) {
    this.timelines = !timelines ? [] : timelines;
  }

  follow(timeline) {
    this.timelines.push(timeline);
  }

  flattenTimelinePosts() {
    return this.timelines.reduce((flattenedPosts, timeline) => {
      flattenedPosts.push(...timeline.getFlattenedPosts());
      return flattenedPosts;
    }, []);
  }

  view() {
    const flatTimelinePosts = this.flattenTimelinePosts();

    // TODO:: move out to a PostSorter class to be used by Timeline and Wall
    const flatTimelinePostsDescending = flatTimelinePosts.sort(
      (a, b) => a.secondsAgo - b.secondsAgo,
    );

    const postsFormatted = flatTimelinePostsDescending.map((ftp) => {
      // TODO:: move out to a TimeFormatter class to be used by Timeline and Wall
      const secondsAgoText = moment().subtract(ftp.secondsAgo, 's').fromNow();

      return `${ftp.name} - ${ftp.content} (${secondsAgoText})`;
    });

    return postsFormatted.join('\n');
  }
}

module.exports = Wall;
