import axios from 'axios'

var accessToken = process.env.INSTAGRAM_API_TOKEN;

var message;

exports.handler = async (event, context) => {
	try {
		const res = await axios.get('https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=' + accessToken);
		message = res.data;

		// Refresh the long-lived access token
		const res2 = await axios.get('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=' + accessToken);

		// Update the access token
		accessToken = res2.data.access_token;
	} catch (err) {
		console.error(err);
	}

	return {
		statusCode: 200,
		body: JSON.stringify({
			feed: message
		})
	};
}

