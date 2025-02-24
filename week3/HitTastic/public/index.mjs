async function ajaxSearch(artist) {
    try {
        // Send a request to the API end point URL
        const response = await fetch(`/albums/${artist}/`);
        // Parse the JSON.
        const artists = await response.json();
        // Loop through the array of JSON objects and add the results to a <div>
        let html = "";
        artists.forEach ( theArtist => {
            html += `<div>
    <div> ID - ${theArtist.id}</div>
    <div> Title - ${theArtist.title}</div>
    <div> Artist - ${theArtist.artist}</div>
    <div> Year - ${theArtist.year}</div>
    <br>
    <hr>`;
   

        });
        document.getElementById('results').innerHTML = html;
    } catch (e) {
        alert(`There was an error: ${e}`);
    }
}

document.getElementById('ajaxSearchBtn').addEventListener('click', ()=> {
    // Read the product type from a text field
    const artist = document.getElementById('artist').value;
    ajaxSearch(artist);
});