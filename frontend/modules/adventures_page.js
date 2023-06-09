
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search); 
  const city = params.get('city');
  return city;
  }

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint+`/adventures/?city=${city}`)
    let data = await res.json();
    return data;
  } catch (err){
    return null ;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(key => {
  let parents = document.getElementById('data');
  let child = document.createElement('div');
  child.classList='col-6 col-lg-3 mb-3 '
  child.innerHTML=`
    <a id=${key.id} href='detail/?adventure=${key.id}'>
      <div class=" activity-card ">
        <img src=${key.image} alt="..." />
        <div class='adventure-detail-card'>
        <div class=" d-md-flex justify-content-between">
          <h5 class="card-title">${key.name}</h5>
          <p class="card-text">₹${key.costPerHead}</p>
        </div>
        <div class=" d-md-flex justify-content-between">
          <h5 class="card-title">Duration</h5>
          <p class="card-text">${key.duration} Hours</p>
        </div>
        </div>
        <div class='category-banner'>${key.category}</div>
      </div>
    </a>
  `
  parents.append(child);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newList = list.filter((ele) => {
    return ele.duration >= low && ele.duration <= high
    });
  return newList
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
 let filteredList = list.filter((element) => {
    return categoryList.includes(element.category);
});
  return filteredList ;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
let filteredList = []
if(filters.duration === '' && filters.category.length===0){
  return list;
}
if(filters.duration === "" && filters.category.length!==0){
  filteredList = filterByCategory(list,filters.category);
}
else if(filters.category.length === 0 && filters.duration!==""){
  let splitDuration = filters.duration.split('-');
  filteredList = filterByDuration(list,splitDuration[0],splitDuration[1]);
}
else{
  let list1 = filterByCategory(list,filters.category);
  let splitDuration = filters.duration.split('-');
  let list2 = filterByDuration(list1,splitDuration[0],splitDuration[1]);
  filteredList = list2;
}
return filteredList;

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
    return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = filters.category;
  let domCategory = document.getElementById('category-list');
  domCategory.innerHTML = '';
  categoryList.forEach((item)=>{
    let spanT = document.createElement("spanT");
    spanT.setAttribute('class', 'category-filter');
    spanT.innerText = item;
    domCategory.appendChild(spanT)
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
