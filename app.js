const urlParams = new URLSearchParams(window.location.hash);


var spotifyApi = new SpotifyWebApi();
var access_token = urlParams.get('#access_token');

var monthlyList = document.getElementById('monthly-list');
var yearlyList = document.getElementById('yearly-list');

if(access_token != null) {
    console.log("Retrieved access token: " + access_token);

    // We have an access token! Let's assign it to the API Wrapper
    spotifyApi.setAccessToken(access_token);

    console.log("Current access token: " + spotifyApi.getAccessToken());

    // Specify our options for the monthly top songs query
    monthly_options = {
        "time_range": "short_term",
        "limit": 10,
    }

    // Send the monthly request to Spotify
    spotifyApi.getMyTopTracks(monthly_options, function callback(error, data){
        if(error != null) {
            // Request failed, alert the user to the error
            console.log("An error occured: ");
            console.log(error);
        }
        else {
            // Request succeeded, log our data
            console.log("Successfully retrieved top monthly songs: ");
            for(var i = 0; i < 10; i++) {
                var song = data.items[i];
                console.log(song.name);
                console.log(song.uri);
                var newItem = document.createElement('li');
                newItem.innerText = song.name + ": ";

                var itemLink = document.createElement('a');
                itemLink.innerText = "Click Here";
                itemLink.href = song.uri;

                newItem.appendChild(itemLink);

                monthlyList.appendChild(newItem);
            }
        }
    });


    // Specify our options for the yearly top songs query
    yearly_options = {
        "time_range": "long_term",
        "limit": 10,
    }
    https://spideymen-top-songs.000webhostapp.com
    // Send the monthly request to Spotify
    spotifyApi.getMyTopTracks(yearly_options, function callback(error, data){
        if(error != null) {
            // Request failed, alert the user to the error
            console.log("An error occured: ");
            console.log(error);
        }
        else {
            // Request succeeded, log our data
            console.log("Successfully retrieved top yearly songs: ");
            for(var i = 0; i < 10; i++) {
                var song = data.items[i];
                console.log(song.name);
                console.log(song.uri);
                var newItem = document.createElement('li');
                newItem.innerText = song.name + ": ";

                var itemLink = document.createElement('a');
                itemLink.innerText = "Click Here";
                itemLink.href = song.uri;

                newItem.appendChild(itemLink);

                yearlyList.appendChild(newItem);
            }
        }
    });
}
else {
    console.log("Could not find access token... redirecting to Spotify for authorization");

    // We don't have an access token. Let's automatically redirect the user to spotify's login so we can get one!
    window.location.href = "https://accounts.spotify.com/authorize?client_id=5c240c59b1ed425a9f1c3bb751dd3c4b&response_type=token&redirect_uri=https%3A%2F%2Fspideymen-top-songs.000webhostapp.com%2Findex.html&scope=user-top-read"
}