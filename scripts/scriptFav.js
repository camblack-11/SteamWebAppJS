const games = document.getElementById('games');
const favs = JSON.parse(localStorage.getItem("allEntries"));
console.log(favs);

function favGames() {
    console.log(favs);
    games.innerHTML = '';
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

function kill(formId) {
    var num = formId;
    favs.splice(num,1);
    console.log(favs);
    localStorage.setItem("allEntries", JSON.stringify(favs));
    location.reload();
}

function killAll() {
    localStorage.setItem("allEntries", null);
    location.reload();
}

function gameDeets(deetId, deetUrl) {
    console.log(deetId);
    console.log(deetUrl);
    localStorage.setItem('id', deetId);
    localStorage.setItem('transfer', deetUrl);
    window.open("./game.html", "_value");
}

favGames();