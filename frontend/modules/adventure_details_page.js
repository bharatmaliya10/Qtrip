import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const advanture = params.get('adventure')
  return advanture;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
  let res =await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
  let data = await res.json();
  return data;
  } catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let advantureName = document.getElementById('adventure-name')
  advantureName.innerHTML=adventure.name
  let adventureSubtitle = document.getElementById('adventure-subtitle')
  adventureSubtitle.innerHTML=adventure.subtitle
  let images = adventure.images
  let photoGallary = document.getElementById('photo-gallery')
  images.forEach(key => {
    let gallaryImg = document.createElement('div')
    gallaryImg.classList='activity-card-image'
    gallaryImg.innerHTML = `
    <img src=${key} alt=''/>`
    photoGallary.append(gallaryImg);
  });
  document.getElementById('adventure-content').innerHTML=adventure.content
  document.getElementById('reservation-person-cost').innerHTML=adventure.costPerHead
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallary = document.getElementById('photo-gallery')
  photoGallary.innerHTML=`
  <div id="carouselExample" class="carousel slide">
  <div id='carousel-inner' class="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
  let carousal = document.getElementById('carousel-inner')
  images.forEach((key)=>{
    let parent = document.createElement('div')
    parent.classList='carousel-item activity-card-image'
    parent.innerHTML=`
      <img src=${key} class="d-block w-100" alt="...">
  `
  carousal.append(parent)
  })
  carousal.firstChild.nextElementSibling.classList='carousel-item active activity-card-image'
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById('reservation-panel-sold-out').style.display='none'
    document.getElementById('reservation-panel-available').style.display='block'
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead
  } else {
    document.getElementById('reservation-panel-sold-out').style.display='block'
    document.getElementById('reservation-panel-available').style.display='none'
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
let totalcost =adventure.costPerHead * persons
document.getElementById('reservation-cost').innerHTML = totalcost
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let myForm = document.getElementById('myForm')
  myForm.addEventListener('submit', async(e)=>{
    e.preventDefault();
    let url = config.backendEndpoint+'/reservations/new'
    let formElem = myForm.elements;
    let payLoad = {
      name:formElem['name'].value.trim(),
      date:formElem['date'].value,
      person:formElem['person'].value,
      adventure:adventure.id,
    }
    try{
      let res = await fetch(url, {
        method:'POST',
        body:JSON.stringify(payLoad),
        headers:{
          'Content-type': 'application/json'
        }
      })
      if(res.ok){
      alert('Success')
      }else{
        alert('failed')
      }
    }catch(err){
      alert('Failed to fetch')
    }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display='block'

  }else {
    document.getElementById('reserved-banner').style.display='none'

  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
