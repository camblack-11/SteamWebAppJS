const games = document.getElementById('games');
const fav = document.getElementById('fav');

/* querying the same API call on index.html with the sent over search link (transfer) to grab the same Array information */
async function load(){
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '08f94b54e0msh5543c9af6800b8ap1ce59cjsn2a40ad7b2e5c',
            'x-rapidapi-host': 'steam2.p.rapidapi.com'
        }
    };

    let url = localStorage.getItem('transfer');
        console.log(url);
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        gameDetail(result)
    } catch (error) {
        console.error(error);
    } 

    
    /* Game Detail grabbing */
    /* uses a number id kept in local storage from the index page to determine which part of the array to grab the steam appId from, then query the appDetail API with this appId to grab the detailed information array */
    async function gameDetail(result){
        let id = localStorage.getItem('id');
        console.log(id);
        const storeLink = result[id].url;
        const appId = result[id].appId;
        console.log(appId);
        const game = `https://steam2.p.rapidapi.com/appDetail/${appId}`;
        console.log(game);
        const keys = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '08f94b54e0msh5543c9af6800b8ap1ce59cjsn2a40ad7b2e5c',
                'x-rapidapi-host': 'steam2.p.rapidapi.com'
            }
        };

        try {
            const pickup = await fetch(game, keys);
            const details = await pickup.json();
            console.log(details);
            displayGame(details, storeLink);
        } catch (error) {
            console.error(error);
        }
    }
}

/* using the data grabbed from the second API call (details) + the url to the store page for the game as it is only stored in the search array, not the detail array, places all of it into HTML for display, showing images, text and links using createElements targetting the details array */
function displayGame(details, storeLink) {
    games.innerHTML = '';
    const card = document.createElement('div');
        card.classList.add('card', 'container', 'squish');
        card.id = 'game';

        const img = document.createElement('img');
        img.src = details.imgUrl;

        const title = document.createElement('a');
        title.textContent = details.title;
        title.href = storeLink;
        title.target = '_blank';
        title.id = 'title';

        const desc = document.createElement('p');
        desc.textContent = details.description;

        const dev = document.createElement('a');
        dev.textContent = 'Developer: ' + details.developer.name;
        dev.href = details.developer.link;
        dev.target = "_blank";

        const pub = document.createElement('a');
        pub.textContent = 'Publisher: ' + details.publisher.name
        pub.href = details.publisher.link;

        const release = document.createElement('p');
        release.textContent = 'Release Date: ' + details.released;

        const price = document.createElement('p');
        price.textContent = 'Price: ' + details.price;

        const form = document.createElement('form');
        form.action = 'javascript:favorite()';

        const fav = document.createElement('input');
        fav.type = 'submit'
        fav.id = 'fav';
        fav.value = 'Favorite!';
        fav.classList.add('marg');

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(dev);
        card.appendChild(pub);
        card.appendChild(release);
        card.appendChild(price);
        form.appendChild(fav);
        card.appendChild(form);
        games.appendChild(card);
}

/* queries the original index API call (options) in conjunction with the search term (transfer/url) to grab needed data (appId, imgUrl, title, url, the search id), this data is sent to addEntry() */
async function favorite() {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '08f94b54e0msh5543c9af6800b8ap1ce59cjsn2a40ad7b2e5c',
            'x-rapidapi-host': 'steam2.p.rapidapi.com'
        }
    };

    let url = localStorage.getItem('transfer');
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let id = localStorage.getItem('id');
        const entryLink = result[id].url;
        const entryTitle = result[id].title;
        const entryImg = result[id].imgUrl;
        const entryId = result[id].appId; 
        console.log(entryLink);
        console.log(entryTitle);
        console.log(entryImg);
        console.log(entryId);
        console.log(url);
        console.log(id);
        addEntry(entryLink, entryTitle, entryImg, entryId, url, id);
    } catch (error) {
        console.error(error);
    }
}

/* addEntry() grabs all the game data from favorite() and puts it into favorites array (existingEntries) in localStorage  */
/* checkArrayDupeFree() acts as a failsafe to prevent the user from adding the same game multiple times, stringifies the array and scans it to see if a duplicate entry exists already ends the function with a console.log saying it's already been entered. if game is unique then it will set existingEntries into localStorage */
function addEntry(entryLink, entryTitle, entryImg, entryId, url, id) {
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if(existingEntries == null) existingEntries = [];
    var entry = {
        "appId": entryId,
        "title": entryTitle,
        "url": entryLink,
        "imgUrl": entryImg,
        "searchUrl": url,
        "searchId" : id
    };
    console.log(entry);
    console.log(existingEntries);
    localStorage.setItem("entry", JSON.stringify(entry));
    existingEntries.push(entry);
    if(checkArrayDupeFree(existingEntries, JSON.stringify)) {
    // Save allEntries back to local storage
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    } else {
        console.log("Already Entered!");
    }
}

/* creates a Map() with every entry stringified (dupeMap), runs a for loop with the array entry being saved as an individual variable (el), then being stringified (id) to compare to the duplicate entries, if an entry already exists it will return false */
function checkArrayDupeFree(myArray, idFunc) {
    const dupeMap = new Map();
    for (const el of myArray) {
        const id = idFunc(el);
        if (dupeMap.has(id))
            return false;
        dupeMap.set(id, el);
    }
    return true;
}

load();