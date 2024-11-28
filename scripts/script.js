const searchBtn = document.getElementById('searchBtn');
const searchBox = document.getElementById('searchBox');
const games = document.getElementById('games');
/* default search query is set upon load */
localStorage.setItem('searchQuery', 'Half-Life');

/* grabs the text entered into the search box using searchBox.value and sends it to be plugged into the API function with the query variable */
function querying() {
    console.log(searchBox.value);
    const query = searchBox.value;
    searchShit(query);
};

/* resets to the searchQuery localStorage and resets the id localStorage to "nope" (which is used for determining which link was clicked and sending that information to game.html) upon load */
window.addEventListener('load', (event)=> {
    let searchItem = localStorage.getItem('searchQuery');
    localStorage.setItem('id', 'nope');
    console.log(searchItem);
    searchShit(searchItem);
})

/* calls the API with the serach query, also sends that specific link + query (url) to game.html as the localStorage variable "transfer" */
async function searchShit($query) {    
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

    /* using the api to fetch the url variable with the search query link, and the api key + host to combine them together for a valid API call as response. response is then converted to json to make an array called result, which is sent to the displayGames function */
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        displayGames(result);
    } catch (error) {
        console.error(error);
    }
}

/* setting a for loop to loop through the HTML creating code up to 10 times using createElements in conjunction with referring to the array class (result) + the loop number it's on to target a specific object in the array, then targeting the different classes within that object that house the information like the game title or image, with an else if waiting for an undefinied when it runs out and has less than 10 games appear, and an if waiting to cut it off if it hits 10 games */

/* the splide framework is integrated here with the settings to alter how it functions, and the HTML createElement code is set up with the relevant classes to allow it to work */
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
    /* an (unfortunately) somewhat brute-forcey solution for getting the specific game clicked over to game.html

    relies on using mouseover addEventListeners with querySelectorAlls to account for how the splide treats its ability to loop around. each mouseover will update an id localStorage value to a number between 0-9 depending on its placement, corresponding with its placement in the API array, this id value is read on game.html in conjunction with the array being called on that side to grab the correct game you clicked on
    
    couldn't work out a way to make it more modular depending on how many games are called, although im sure there is a way to do so that would be a lot cleaner and save a lot of lines. */
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