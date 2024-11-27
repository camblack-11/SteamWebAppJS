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

            const title = document.createElement('a');
            title.textContent = favs[i].title;
            title.href = favs[i].url;
            title.target = '_blank';
            title.id = 'title';

            const form = document.createElement('form');
            form.id = i;
            form.action = `javascript:kill(${form.id})`;
            
            const unFav = document.createElement('input');
            unFav.type = 'submit';
            unFav.value = 'Remove';
            unFav.id = 'btn' + [i];
            

            card.appendChild(img);
            card.appendChild(title);
            form.appendChild(unFav);
            card.appendChild(form);
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

favGames();