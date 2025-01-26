const express = require('express');
const ytch = require('yt-channel-info');

const app = express();
const PORT = 3000;

const channelId = 'UCHLVEoCh9Naic3_QkTj6P-g';

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Nutri Edvânia Soares Latest Video API</h1>
    <p>Access <strong><a href="/latest-video">/latest-video</a></strong> to get the latest video information from Edvânia Soares YouTube channel.</p>
    <p>For more details, check out the <a href="https://github.com/ArielSpencer/api-lastest-yt-video-edvania-soares" target="_blank">documentation on GitHub</a>.</p>
    <p>Developed by <a href="http://arielspencer.com.br" target="_blank">Ariel Spencer</a></p>
  `);
});

app.get('/latest-video', async (req, res) => {
  try {
    const response = await ytch.getChannelVideos({
      channelId,
      sortBy: 'newest',
    });

    if (response.items.length > 0) {
      const video = response.items[0];
      const videoId = video.videoId;
      const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
      const videoTitle = video.title;
      const thumbnail = video.videoThumbnails[0].url;

      return res.json({ videoId, videoLink, videoTitle, thumbnail });
    } else {
      return res.status(404).json({ message: 'No videos found.' });
    }
  } catch (error) {
    console.error('Error fetching channel data:', error.message);
    res.status(500).json({ message: `Error processing YouTube data: ${error.message}` });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);