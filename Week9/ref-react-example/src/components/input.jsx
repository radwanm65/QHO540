import {useEffect, useRef} from 'react';

export default function Demo() 
{
    const inputRef = useRef(null);

    useEffect(()=> {
        inputRef.current?.focus();
    },[]);

    return <input ref={inputRef} />;
}