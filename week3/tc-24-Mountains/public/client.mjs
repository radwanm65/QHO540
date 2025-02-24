

async function ajaxSearch(difficulty) {
    try {
        // Send a request to the API end point URL
        const response = await fetch(`/climbSearch/${difficulty}/`);
        // Parse the JSON.
        const mountains = await response.json();
        // Loop through the array of JSON objects and add the results to a <div>
        let html = "";
        mountains.forEach ( mountain => {
            html += `<div>
    <div> Name - ${mountain.name}</div>
    <div> Difficulty - ${mountain.difficulty}</div>
    <div> Height - ${mountain.height}m</div>
    <div> Distance - ${mountain.distance}km</div>
    <div> Mountain ID - ${mountain.ID}</div>
    <br>
    <hr>`;
        });
        document.getElementById('climbResults').innerHTML = html;
    } catch (e) {
        alert(`There was an error: ${e}`);
    }
}

document.getElementById('btnClimbSearch').addEventListener('click', ()=> {
    // Read the product type from a text field
    const difficulty = document.getElementById('climbDifficulty').value;
    ajaxSearch(difficulty);
});