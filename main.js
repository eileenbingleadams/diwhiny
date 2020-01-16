//mobile menu show hide//

//grab menu icon and menu
var mobileMenuIcon = document.querySelector('li.mobile-nav-icon');
var mobileMenu = document.querySelector('div.mobile-menu');

//listen for click
mobileMenuIcon.addEventListener('click',function(event)
{
    event.preventDefault();
    console.log('I have clicked the menu icon');
    if (mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
    }
    else {
        mobileMenu.classList.add('show');
    }
}
)

//search button//

//grab search button and icon
var searchButton = document.querySelector('button.search');
var searchIcon = document.querySelector('img.search-icon');

//grab search input
var searchInput = document.querySelector('.search-bar');

//listen for the click
searchButton.addEventListener('click',function(event)
{
    console.log('I have clicked the button');
    if (searchInput.classList.contains('show')) {
        searchInput.classList.remove('show');
        searchIcon.src='assets/icons/search.svg';
    }
    else {
        searchInput.classList.add('show');
        searchIcon.src='assets/icons/close.svg';
        searchInput.focus();
    }
}
)


//search functionality//
var PAGES = PAGES || {};

var searchBar = document.querySelector('input.search-bar');

searchBar.addEventListener('keyup',function(event){
    if (event.keyCode===13) {
        var searchQuery = searchBar.value;
        var parsedSearchQuery = searchQuery.split(' ');

        //get search results
        const searchResults = PAGES.data.filter(function(singlePage){
            return parsedSearchQuery.map(function(searchWord){
                return singlePage.keywords.includes(searchWord);       
            }).includes(true)
        })
        console.log(searchResults);

        //show search results
        var pageMain = document.querySelector('main');
        pageMain.innerHTML = "";
        pageMain.classList.remove('display-flex');

        let all = "";
        searchResults.forEach(function(matchedPage){
            const searchResult = 
            `
            <a class="project-tile" href="${matchedPage.href}">
            <img class="project-photo" src="${matchedPage.image}" alt="${matchedPage.title}">
            <div class="project-text">
                <h3>${matchedPage.title}</h3>
                <p>${matchedPage.description}</p>
            </div>
            </a>
            `
            all+=searchResult;
        })

        const displaySearchResults = 
        `
        <h2 class="grid-page-title">Search Results for: ${searchQuery}</h2>
        <div class="grid">
        ${all}
        </div>
        `;
        pageMain.innerHTML += displaySearchResults;
        }
    }
    )

//display all wine functionality
var allWines = WINES.data || {};
var initialWineDisplay = document.querySelector('.wine-display');

if(initialWineDisplay){

let initalWinesAll = "";
allWines.forEach(function(wine){
    const wineResult = 
               `
                <div class="project-tile">
                <img class="project-photo" src="${wine.image}" alt="Wine Placeholder 2">
                <div class="project-text">
                    <div class="display-flex space-between">
                        <h3>${wine.title}</h3>
                        <h3>${wine.price}</h3>
                    </div>
                        <h3>${wine.variety}</h3>
                        <h3>${wine.region}</h3>
                <p>${wine.description}</p>  
                </div>
                </div>
                `
                initalWinesAll+=wineResult;
            })
console.log(initalWinesAll);
    const displayResults = 
            `
             <div class="grid">
                ${initalWinesAll}
            </div>
            `;
            initialWineDisplay.innerHTML += displayResults;

        };




//wine filter functionality//

//grab all the stuff we need
const wineFilterSection = document.querySelector('.wine-filter-section');
const allCheckboxes = document.querySelectorAll('.wine-checkbox');
const varietyCheckboxes = document.querySelectorAll('fieldset.variety input');
const priceCheckboxes = document.querySelectorAll('fieldset.price input');
const regionCheckboxes = document.querySelectorAll('fieldset.region input');

//add change listener to whole section

if (wineFilterSection){
wineFilterSection.addEventListener('change', function(e){

//create object of filters (true/false)
checkboxValues = {};
allCheckboxes.forEach((box) => {
    checkboxValues[box.value] = box.checked;
}
) 
console.log(checkboxValues);


//check which sets of inputs have at least one true value (price, wine, etc)
let checkVariety = false;
Array.from(varietyCheckboxes).forEach((box)=>
{
    if(box.checked){
        checkVariety = true;
    }
})

let checkPrice = false;
Array.from(priceCheckboxes).forEach((box)=>
{
    if(box.checked){
        checkPrice = true;
    }
})

let checkRegion = false;
Array.from(regionCheckboxes).forEach((box)=>
{
    if(box.checked){
        checkRegion = true;
    }
})

console.log(checkVariety,checkPrice,checkRegion);


//initialize filtered results to all
var wineData = WINES || {};

let filterResults = wineData.data;

console.log(wineData);

//update filtered results for each set of inputs, based on true/fals values of filters

if(checkVariety){
    filterResults = wineData.data.filter(wine => {
        if(checkboxValues[wine.variety]){
            return true
        }
        else false
    }
    )
}

if(checkPrice){
    filterResults = filterResults.filter(wine => {
        if(checkboxValues[wine.price]){
            return true
        }
        else false
    }
    )
}

if(checkRegion){
    filterResults = filterResults.filter(wine => {
        if(checkboxValues[wine.region]){
            return true
        }
        else false
    }
    )
}

console.log(filterResults);


//display results
var wineDisplay = document.querySelector('.wine-display');
wineDisplay.innerHTML = "";

let all = "";
filterResults.forEach(function(matchedWine){
                const wineResult = 
                           `
                            <div class="project-tile">
                            <img class="project-photo" src="${matchedWine.image}" alt="Wine Placeholder 2">
                            <div class="project-text">
                                <div class="display-flex space-between">
                                    <h3>${matchedWine.title}</h3>
                                    <h3>${matchedWine.price}</h3>
                                </div>
                                    <h3>${matchedWine.variety}</h3>
                                    <h3>${matchedWine.region}</h3> 
                            <p>${matchedWine.description}</p>  
                            </div>
                            </div>
                            `
                            all+=wineResult;
                        })

                const displayFilterResults = 
                        `
                         <div class="grid">
                            ${all}
                        </div>
                        `;
        wineDisplay.innerHTML += displayFilterResults;

},
true

)
}


//open form

var modalOpenButton = document.querySelector('.modal-button');
var modal = document.querySelector('.modal-overlay');
var body = document.querySelector('body');

if(modalOpenButton) {
modalOpenButton.addEventListener('click',function(event){
    console.log(event);
    modal.classList.add('show');
    body.classList.add('no-scroll');
    }
)

//close form
var modalCloseButton = document.querySelector('.modal-close');
modalCloseButton.addEventListener ('click',function(event){
    modal.classList.remove('show');
    body.classList.remove('no-scroll');
})
}
