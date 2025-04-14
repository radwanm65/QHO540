
// Handle button clicks on the search button
document.getElementById("ht_search").addEventListener("click", e=> {

    // Read in the artist from the form field
    const artist = document.getElementById("ht_artist").value;
    ajaxSearch(artist);
});

async function ajaxSearch(artist) {

    // Send a fetch request to the artist route on this server, passing the
    // artist as a parameter
    const ajaxResponse = await fetch(`/artist/${artist}`);

    // Parse the JSON
    const songs = await ajaxResponse.json();

    // Store the results <div> in a variable to avoid having to look it up 
    // each time
    const resultsDiv = document.getElementById("ht_results");

    // Blank out the results <div>
    resultsDiv.innerHTML = "";

    // Loop through each song in the JSON
    songs.forEach( song => {
        // Create a <div> for the current song
        const div = document.createElement("div");
        
        // Create a text node to hold the song details
        const textNode = document.createTextNode(`${song.title} by ${song.artist}, year ${song.year}, quantity ${song.quantity}`);
    
        // Append the text node to the <div>
        div.appendChild(textNode);

        // Create a button, allowing the user to buy the song
        const buyBtn = document.createElement("input");
        buyBtn.setAttribute("type", "button");
        buyBtn.setAttribute("value", "Buy!");

        // Add an event listener to the button
        buyBtn.addEventListener("click", async() => {
            try {
                // Send a POST request to the 'buy' route
                const response = await fetch(`/song/${song.id}/buy`, { 
                    method: 'POST' 
                });

                // Check the status code, was it successful or not?
                if(response.status == 200) {
                    alert('Successfully bought!');
                } else {
                    // If there was an error, the JSON returned from the server 
                    // will contain an "error" field.
                    const jsonData = await response.json();
                    alert(jsonData.error);
                }
            } catch(e) {
                alert(`Error with song ID ${song.id}: ${e}`);
            }
        });

        // Add the buy button to the <div>
        div.appendChild(buyBtn);

        // Add the <div> to the overall results <div>
        resultsDiv.appendChild(div);
    });
}


// Add a song
document.getElementById("ht_add").addEventListener("click", async() => {

    // Create an object containing the details from the form
    const song = {
        "title": document.getElementById("new_title").value,
        "artist": document.getElementById("new_artist").value,
        "year": document.getElementById("new_year").value,
        "quantity": document.getElementById("new_quantity").value,
        "price": document.getElementById("new_price").value
    };

    try {

        // Send an AJAX post request to the server, with the song in the body
        const response = await fetch('/song/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        });    

        // Handle the status returned from the server
        if(response.status == 200) {
            alert("Successfully added");
        } else if (response.status == 400) {
            alert("Blank fields");
        } else {
            alert(`Unknown error: code ${response.status}`);
        }
    } catch(e) {
        alert(`Error: ${e}`);
    }
});

document.getElementById('btnLogin').addEventListener('click', async () => {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    console.log(u,p);
    const response = await fetch(`/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p })
    });
    if (response.status == 200 || response.status == 201) {
        document.getElementById('loginStatus').innerHTML = `<span style="color:green;">Login Success</span>`;
    } else {
        let error = await response.json();
        document.getElementById('loginStatus').innerHTML = `<span style="color:red;">${error.error}</span>`;
    }
});
