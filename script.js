const searchBtn = document.getElementById('searchBtn');
const searchBox = document.getElementById('searchBox');
const games = document.getElementById('games');



// searchBtn.addEventListener('click', ()=> {
//     console.log(searchBox.value);
//     const query = searchBox.value;
//     searchShit(query);
//     localStorage.setItem('searchQuery', 'Half-Life');
// });

function querying() {
    console.log(searchBox.value);
    const query = searchBox.value;
    searchShit(query);
    localStorage.setItem('searchQuery', 'Half-Life');
};

window.addEventListener('load', (event)=> {
    let searchItem = localStorage.getItem('searchQuery');
    localStorage.setItem('id', 'nope');
    console.log(searchItem);
    searchShit(searchItem);
})

// $query = 'Pseudoregalia';

async function searchShit($query) {    

    // console.log($query);

    const url = `https://steam2.p.rapidapi.com/search/${$query}/page/1`;
    localStorage.setItem('transfer', url);
    let test = localStorage.getItem('transfer');
    console.log(test);

    console.log(url);
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '597cace0d3mshc565c425274703bp1f2f2bjsn4a54f456c6cd',
            'x-rapidapi-host': 'steam2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        displayGames(result);
    } catch (error) {
        console.error(error);
    }
}

function displayGames(result){
    games.innerHTML = '';
    for(let i=0; i < 10; i++){
        if(result[i] == undefined){
            break;
        } else {
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = 'game' + [i];

            const img = document.createElement('img');
            img.src = result[i].imgUrl;

            const title = document.createElement('a');
            title.textContent = result[i].title;
            title.href = './game.html';
            title.target = '_blank';
            title.id = 'link' + [i];

            card.appendChild(img);
            card.appendChild(title);
            games.appendChild(card);
        }
    }
    const link0 = document.getElementById('link0');
    const link1 = document.getElementById('link1');
    const link2 = document.getElementById('link2');
    const link3 = document.getElementById('link3');
    const link4 = document.getElementById('link4');
    const link5 = document.getElementById('link5');
    const link6 = document.getElementById('link6');
    const link7 = document.getElementById('link7');
    const link8 = document.getElementById('link8');
    const link9 = document.getElementById('link9');

    
    link0.addEventListener("mouseover", zeroClick);
    function zeroClick() {
        localStorage.setItem('id', '0');

    }
    link1.addEventListener("mouseover", oneClick);
    function oneClick() {
        localStorage.setItem('id', '1');

    }
    link2.addEventListener("mouseover", twoClick);
    function twoClick(){
        localStorage.setItem('id', '2');
    }
    link3.addEventListener("mouseover", threeClick);
    function threeClick(){
        localStorage.setItem('id', '3');
    }
    link4.addEventListener("mouseover", fourClick);
    function fourClick(){
        localStorage.setItem('id', '4');
    }
    link5.addEventListener("mouseover", fiveClick);
    function fiveClick(){
        localStorage.setItem('id', '5');
    }
    link6.addEventListener("mouseover", sixClick);
    function sixClick(){
        localStorage.setItem('id', '6');
    }
    link7.addEventListener("mouseover", sevenClick);
    function sevenClick(){
        localStorage.setItem('id', '7');
    }
    link8.addEventListener("mouseover", eightClick);
    function eightClick(){
        localStorage.setItem('id', '8');
    }
    link9.addEventListener("mouseover", nineClick);
    function nineClick(){
        localStorage.setItem('id', '9');
    }
}

// const other = document.getElementById('other');


// other.addEventListener("mouseover", otherClick);
//     function otherClick() {
//         localStorage.setItem('id', 'huh?');

//     }

// 1.addEventListener('click', ()=> {
//     localStorage.setItem('number', 'one');
// });


// searchShit();