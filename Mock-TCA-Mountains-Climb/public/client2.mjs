
// Q1 replace the ????? so that this event listener handles click events on
// the climb search button
document.getElementById('?????').addEventListener('click', async() => {

    // Q2 complete this statement to read the difficulty level from the form
    const difficulty = ?????;

    // Q3 complete the fetch API call to send the difficulty level
    // to the 'climb search' route in server.js. You will need to look
    // at the server.js code to complete this successfully.
    const response  = await fetch('?????');
    const json = await response.json();
    
    // Q6 complete so that it parses the JSON returned and outputs the
    // data to the climbResults <div> in the format shown on the paper.
    // It must be formatted as shown in the following example:
    
    //  Name – Mount Tharg
    //  Difficulty - Medium
    //  Height – 2600m
    //  Distance  - 10km

    // Q8 Update your answer to question 6 so that there is a “Like” button for
    // each matching result. When the button is clicked, an appropriate HTTP 
    // request must be sent to the “like” route, to allow the selected mountain 
    // climb to be liked.
        
   
});

// Q9 replace the ????? so that this event listener handles click events on
// the "add climb" button
// Note the event listener has been setup to be an async function - this may help you
document.getElementById('?????').addEventListener('click', async() => {

    // Q9 complete these statements to read the climb details from the form
    const mountainName = ?????;
    const mountainDifficulty = ?????;
    const mountainHeight = ?????;
    const routeDistance = ?????;

    // Q9 complete the fetch API call to send the data to the 'add climb'
    // route on the server as a POST request... 

    // Q12 modify Q9 answer to handle non-200 status codes. Ensure that
    // user-friendly error messages are displayed to the user in the
    // 'addClimbStatus' <div>.
});

// Q13 replace the ????? so that this event listener handles click events on
// the login button
// Note the event listener has been setup to be an async function - this may help you

document.getElementById('?????').addEventListener('click', async() => {

    // Q13 complete these statements to read login details from the form
    const u = ?????;
    const p = ?????;

    // Q13 complete the fetch API call to send the data to the login 
    // route on the server as a POST request... 

    // Q14 modify Q13 answer so that if the user did not log in correctly, 
    // a user-friendly error message is displayed to the user in the
    // 'loginStatus' <div>.
});
