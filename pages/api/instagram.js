import axios from 'axios'

export default async (req, res) => {
  var accessToken = process.env.INSTAGRAM_API_TOKEN;
  var message;

  try {
    const response = await axios.get('https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=' + accessToken);
    message = response.data;

    // Refresh the long-lived access token
    const response2 = await axios.get('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=' + accessToken);

    // Update the access token
    accessToken = response2.data.access_token;
  } catch (err) {
    console.error(err);
  }
  
  res.status(200).json({ feed: message });
}
