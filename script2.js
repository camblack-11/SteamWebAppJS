const games = document.getElementById('games');

/* querying the same API call on index.html with the sent over search link to grab the same Array information */
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
        // displayGame(result);
        gameDetail(result)
    } catch (error) {
        console.error(error);
    } 

    
    /* Game Detail grabbing */
    /* uses a number id kept in local storage from the index page to determine which part of the array to grab the steam appId from, then query the API to grab the detailed information */
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

/* using the data grabbed from the second API call, places all of it into HTML for display, showing images, text and links */
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

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(dev);
        card.appendChild(pub);
        card.appendChild(release);
        card.appendChild(price);
        games.appendChild(card);
}


load();