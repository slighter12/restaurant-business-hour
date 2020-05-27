import './app.sass';
import 'whatwg-fetch';
import { getDateAndTime } from './searchingtime';

const serverAddress = location.href;

//console.log(`Hello World in ${serverAddress}.`);
function getrestaurantinfo(url, data) {
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    }).then( response => {
        if (!response.ok) throw new Error(`HTTP error, status = ${response.status}`);
        return response.json()
    }).then( data => {
        console.log(data)
        document.getElementById("search-result").innerHTML = '';
        Object.keys(data).forEach( item => {
            const node = document.createElement("li");
            const textnode = document.createTextNode(`${item} working during ${data[item]}`);
            node.appendChild(textnode);
            document.getElementById("search-result").appendChild(node);
        })
    })
}

const submit = document.querySelector('.searchButton');
submit.addEventListener('click', () => {
    let data = getDateAndTime();
    console.log(data);
    getrestaurantinfo(`${serverAddress}search`, data);
});
