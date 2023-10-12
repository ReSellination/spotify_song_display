// Replace with your Spotify Web API credentials
const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'YOUR_REDIRECT_URI';
const scopes = 'user-read-currently-playing';

// Function to parse the access token from the URL
function getAccessTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('access_token');
}

// Check if the user is authenticated
const accessToken = getAccessTokenFromURL();
if (!accessToken) {
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;
} else {
    // Fetch currently playing track
    fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
    .then(response => response.json())
    .then(data => {
        const songInfo = document.getElementById('song-info');
        if (data.item) {
            songInfo.innerText = `Song: ${data.item.name} by ${data.item.artists[0].name}`;
        } else {
            songInfo.innerText = 'No song currently playing';
        }
    })
    .catch(error => {
        console.error('Error fetching currently playing song:', error);
    });
}
