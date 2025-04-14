import { useState, useRef } from 'react';

export default function Timer() {

    const timerHandle = useRef(null);
    const [startTime, setStartTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);


    function startTimer() {
        // If the timer is currently running...
        if(timerHandle.current == null) {

            // Store the start time in state
            const initialTime = Math.round(Date.now());
            setStartTime(initialTime);
            setCurrentTime(initialTime);

            // Start the interval function
            timerHandle.current = setInterval ( () => {
                // Every second, store the current time in state
                const timeNow = Math.round(Date.now());
                setCurrentTime(timeNow);
            } , 1000 );
        }
    }

    function stopTimer() {
        if(timerHandle.current != null) {
            clearInterval(timerHandle.current);
            timerHandle.current = null;
        }
    }

    // Render the number of seconds that have passed by subtracting the
    // current time from the start time
    return( <div>
        Time: {Math.round((currentTime - startTime) / 1000)} seconds <br />
        <input type='button' value='start' onClick={startTimer} />
        <input type='button' value='stop' onClick={stopTimer} />
        </div>
    );
}