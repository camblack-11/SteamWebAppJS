const games = document.getElementById('games');
/* allEntries array is grabbed from localStorage and put into the favs variable for use within the script */
const favs = JSON.parse(localStorage.getItem("allEntries"));
console.log(favs);

/* checks the favs array if there are no games, if there are no games then show a header and paragraph telling the user they have no favorite games, otherwise, execute the rest of the function */
/* runs a for loop that increases that uses createElements to build cards that hold game information, the information is pulled from the favs array using the i value to pull the right entry */
/* the gameDeets() and kill() functions are set up to trigger when the right elements are clicked, with variables implemented to send information to those functions. gameDeets() sends the searchId (deetId) and searchUrl (deetUrl) from the favs array. kill() sends the id of the form it's in */
function favGames() {
    console.log(favs);
    games.innerHTML = '';
    if(favs == 0 || favs == null){
        console.log('no!!');
        const header = document.createElement('h2');
        header.textContent = "You don't have any favorite games!";
        header.classList.add('centerer', 'marg');

        const subHeader = document.createElement('p');
        subHeader.textContent = "Click the favorites button on any game you've opened!";
        subHeader.classList.add('centerer');

        games.appendChild(header);
        games.appendChild(subHeader);
    }
    for(let i=0; i >= 0; i++){
        if (favs[i] == undefined) {
            break;
        } else { 
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = 'game';

            const img = document.createElement('img');
            img.src = favs[i].imgUrl;

            const titleForm = document.createElement('form');
            const deetId = favs[i].searchId;
            const deetUrl = '"' + favs[i].searchUrl + '"';        
            titleForm.action = `javascript:gameDeets(${deetId}, ${deetUrl})`;

            const title = document.createElement('input');
            title.type = 'submit';
            title.value = favs[i].title;
            title.classList.add('title');

            const favForm = document.createElement('form');
            favForm.id = i;
            favForm.action = `javascript:kill(${favForm.id})`;
            
            const unFav = document.createElement('input');
            unFav.type = 'submit';
            unFav.value = 'Remove';
            unFav.id = 'btn' + [i];
            

            card.appendChild(img);
            titleForm.appendChild(title);
            card.appendChild(titleForm);
            favForm.appendChild(unFav);
            card.appendChild(favForm);
            games.appendChild(card);
        }
    }
}

/* takes the id from the form and uses it to splice out the array entry from the favs array, and sets it into localStorage. the page is then reloaded to display changes */
function kill(formId) {
    var num = formId;
    favs.splice(num,1);
    console.log(favs);
    localStorage.setItem("allEntries", JSON.stringify(favs));
    location.reload();
}

/* sets the localStorage array as null to remove all entries, then reloads the page to display changes */
function killAll() {
    localStorage.setItem("allEntries", null);
    location.reload();
}

/* takes the deetId and deetUrl sent over from the form and sets them into localStorage similar to when a game is searched and clicked on index.html, loads game.html and uses these values to call the api there and load the page as normal */
function gameDeets(deetId, deetUrl) {
    console.log(deetId);
    console.log(deetUrl);
    localStorage.setItem('id', deetId);
    localStorage.setItem('transfer', deetUrl);
    window.open("./game.html", "_value");
}

favGames();