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
            'x-rapidapi-key': '08f94b54e0msh5543c9af6800b8ap1ce59cjsn2a40ad7b2e5c',
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
// wawawawa
function displayGames(result){
    games.innerHTML = '';
    for(let i=0; i < 11; i++){
        if(i == 10) {
            const splide = new Splide('.splide', {
                type   : 'loop',
                drag   : 'free',
                perPage: 5,
                rewind : true,
                pagination: false,
            })
            splide.mount();
            break;
        } else if(result[i] == undefined){
            const splide = new Splide('.splide', {
                type   : 'loop',
                drag   : 'free',
                perPage: 5,
                rewind : true,
                pagination: false,
            });
            splide.mount();
            break;

        } else {
            const splide__slide = document.createElement('li');
            splide__slide.classList.add('card', 'splide__slide');
            splide__slide.id = 'game' + [i];

            const img = document.createElement('img');
            img.src = result[i].imgUrl;

            const title = document.createElement('a');
            title.textContent = result[i].title;
            title.href = './game.html';
            title.target = '_blank';
            title.classList.add('link' + [i]);

            splide__slide.appendChild(img);
            splide__slide.appendChild(title);
            games.appendChild(splide__slide);
        }
    }
    const link0 = document.querySelectorAll('.link0');
    const link1 = document.querySelectorAll('.link1');
    const link2 = document.querySelectorAll('.link2');
    const link3 = document.querySelectorAll('.link3');
    const link4 = document.querySelectorAll('.link4');
    const link5 = document.querySelectorAll('.link5');
    const link6 = document.querySelectorAll('.link6');
    const link7 = document.querySelectorAll('.link7');
    const link8 = document.querySelectorAll('.link8');
    const link9 = document.querySelectorAll('.link9');

    for (let i = 0; i < link0.length; i++){
    link0[i].addEventListener("mouseover", zeroClick);
    function zeroClick() {
        localStorage.setItem('id', '0');
        }
    }
    for (let i = 0; i < link1.length; i++){
    link1[i].addEventListener("mouseover", oneClick);
    function oneClick() {
        localStorage.setItem('id', '1');
        }
    }
    for (let i = 0; i < link2.length; i++){
    link2[i].addEventListener("mouseover", twoClick);
    function twoClick(){
        localStorage.setItem('id', '2');
        }
    }
    for (let i = 0; i < link3.length; i++){
    link3[i].addEventListener("mouseover", threeClick);
    function threeClick(){
        localStorage.setItem('id', '3');
        }
    }
    for (let i = 0; i < link4.length; i++){
    link4[i].addEventListener("mouseover", fourClick);
    function fourClick(){
        localStorage.setItem('id', '4');
        }
    }
    for (let i = 0; i < link5.length; i++){
    link5[i].addEventListener("mouseover", fiveClick);
    function fiveClick(){
        localStorage.setItem('id', '5');
        }
    }
    for (let i = 0; i < link6.length; i++){
    link6[i].addEventListener("mouseover", sixClick);
    function sixClick(){
        localStorage.setItem('id', '6');
        }
    }
    for (let i = 0; i < link7.length; i++){
    link7[i].addEventListener("mouseover", sevenClick);
    function sevenClick(){
        localStorage.setItem('id', '7');
        }
    }
    for (let i = 0; i < link8.length; i++){
    link8[i].addEventListener("mouseover", eightClick);
    function eightClick(){
        localStorage.setItem('id', '8');
        }
    }
    for (let i = 0; i < link9.length; i++){
    link9[i].addEventListener("mouseover", nineClick);
    function nineClick(){
        localStorage.setItem('id', '9');
        }
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