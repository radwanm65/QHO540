
// onclick "handleLike"
async function handleLike(id) {
    const response = await fetch(`/like/${id}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.status == 200 || response.status == 201) {
        document.getElementById(`resultResp${id}`).innerHTML = `<span style="color:green;">Liked Climb Success</span>`;
    } else {
        let error = await response.json();
        document.getElementById(`resultResp${id}`).innerHTML = `<span style="color:red;">${error.error}</span>`;
    }
}

// onclick "handleReview"
async function handleReview(id) {
    const response = await fetch(`/review/${id}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: document.getElementById(`review${id}`).value })
    });
    
    if (response.status == 200 || response.status == 201) {
        document.getElementById(`resultResp${id}`).innerHTML = `<span style="color:green;">Added Review Success!</span>`;
    } else {
        let error = await response.json();
        document.getElementById(`resultResp${id}`).innerHTML = `<span style="color:red;">${error.error}</span>`;
    }
}


// Q1 replace the ????? so that this event listener handles click events on
// the climb search button
document.getElementById('btnClimbSearch').addEventListener('click', async () => {

    // Q2 complete this statement to read the difficulty level from the form
    const difficulty = document.getElementById('climbDifficulty').value;

    // Q3 complete the fetch API call to send the difficulty level
    // to the 'climb search' route in server.mjs. You will need to look
    // at the server.mjs code to complete this successfully.
    const response = await fetch(`/climbSearch/${difficulty}/`);

    const json = await response.json();

    // Q6 complete so that it parses the JSON returned and outputs the
    // data to the climbResults <div> in the format shown on the paper.
    let results = json.map((result) => `
    <div>
        <div> Name – ${result.name}</div>
        <div> Difficulty – ${result.difficulty}</div>
        <div> Height – ${result.height}m</div>
        <div> Distance – ${result.distance}km</div>
        <div><button onclick="handleLike('${result.ID}')">Like</button></div>

        <div><input id="review${result.ID}" />
        <div>
            <button onclick="handleReview('${result.ID}')">Review</button>
        </div>
        <div id="resultResp${result.ID}"></div>
        <hr>
    </div>`)
    // Q8 update with a "like" button - see question paper
    document.getElementById('climbResults').innerHTML = results.join('\n')

});


// Q9 replace the ????? so that this event listener handles click events on
// the "add climb" button
// Note the event listener has been setup to be an async function - this may help you
document.getElementById('btnAddClimb').addEventListener('click', async () => {

    // Q9 complete these statements to read the climb details from the form
    const mountainName = document.getElementById('mname').value;
    const mountainDifficulty = document.getElementById('difflevel').value;
    const mountainHeight = document.getElementById('height').value;
    const routeDistance = document.getElementById('dist').value;

    // Q9 complete the fetch API call to send the data to the 'add climb'
    // route on the server as a POST request...
    const response = await fetch(`/addClimb/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: mountainName, difficulty: mountainDifficulty, height: mountainHeight, distance: routeDistance })
    });

    // Q12 modify Q9 answer to handle non-200 status codes. Ensure that
    // user-friendly error messages are displayed to the user in the
    // 'addClimbStatus' <div>.
    if (response.status == 200 || response.status == 201) {
        document.getElementById('addClimbStatus').innerHTML = `<span style="color:green;">Added Climb</span>`;
    } else {
        let error = await response.json();
        document.getElementById('addClimbStatus').innerHTML = `<span style="color:red;">${error.error}</span>`;
    }
});

// Q13 replace the ????? so that this event listener handles click events on
// the login button
// Note the event listener has been setup to be an async function - this may help you
document.getElementById('btnLogin').addEventListener('click', async () => {

    // Q13 complete these statements to read login details from the form
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;

    // Q13 complete the fetch API call to send the data to the login 
    // route on the server as a POST request...
    const response = await fetch(`/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: u, password: p })
    });
    
    // Q14 modify Q13 answer so that if the user did not log in correctly, 
    // a user-friendly error message is displayed to the user in the
    // 'loginStatus' <div>.

    if (response.status == 200 || response.status == 201) {
        document.getElementById('loginStatus').innerHTML = `<span style="color:green;">Login Success</span>`;
    } else {
        let error = await response.json();
        document.getElementById('loginStatus').innerHTML = `<span style="color:red;">${error.error}</span>`;
    }
});
