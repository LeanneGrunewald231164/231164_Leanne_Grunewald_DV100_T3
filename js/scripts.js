/** FLIGHTS **/

let decAmount = document.querySelectorAll('.buttonAmount .buttonAmountLeft');
// Does the decAmount element exist? 
if (decAmount) { 
  decAmount.forEach(el => el.addEventListener('click', adjustFlightAmountLess));
}

let incAmount = document.querySelectorAll('.buttonAmount .buttonAmountRight');
// Does the incAmount element exist? 
if (incAmount) { 
  incAmount.forEach(el => el.addEventListener('click', adjustFlightAmountMore));
}

let bookNowButton = document.querySelectorAll('.buttonBookNow.buttonClickAble');
// Does the incAmount element exist? 
if (bookNowButton) { 
  bookNowButton.forEach(el => el.addEventListener('click', addFlightCart));
}

// Get the Modal by id
let cartModal = document.getElementById('cartModal');
// Does the modal element exist? 
if (cartModal) { 
  // When user presses on the "View Cart" button, call the getModalValues function
  cartModal.addEventListener('show.bs.modal', getModalValues);
}

let flightContent = document.querySelectorAll('section.flights');


// Array containing the flights
// Each array entry contains an object containing the details of the flight added
let flightsInCart = [];


function adjustFlightAmountLess(event){

  let currentParent = event.currentTarget.parentNode;
  let currentGrandParent = event.currentTarget.parentNode.parentNode;
  let currentAmount = parseInt(currentParent.querySelector('.buttonAmountMiddle').innerHTML);

  // If current amount of flights is more than 0, then -1 the amount of flights
  if (currentAmount > 0){
    currentAmount--;
    currentParent.querySelector('.buttonAmountMiddle').innerHTML = currentAmount;
  }

  // If current amount of flights is 0, then hide the minus button, and the Book Now button
  if (currentAmount == 0){
    // Only add class if class is not already present
    if (!event.currentTarget.classList.contains('hideValue')){
      //event.currentTarget.className += " hideValue";
      //currentGrandParent.querySelector('.buttonBookNow').className += " hideValue";
      event.currentTarget.classList.add('hideValue');
      currentGrandParent.querySelector('.buttonBookNow').classList.add('hideValue');
    }
  }
  
}

function adjustFlightAmountMore(event){

  let currentParent = event.currentTarget.parentNode;
  let currentGrandParent = event.currentTarget.parentNode.parentNode;
  let currentAmount = parseInt(currentParent.querySelector('.buttonAmountMiddle').innerHTML);

  // +1 the amount of flights
  currentAmount++;
  currentParent.querySelector('.buttonAmountMiddle').innerHTML = currentAmount;

  // If hideValue class is present, remove, as flight amount has increased
  // Too intense check?
  //if (currentParent.querySelector('.buttonAmountLeft').classList.contains('hideValue')){}

  // If current amount of flights is 1, then show the minus button, and the Book Now button
  if (currentAmount == 1){
    currentParent.querySelector('.buttonAmountLeft').classList.remove('hideValue');
    currentGrandParent.querySelector('.buttonBookNow').classList.remove('hideValue');
  }
  
}

function addFlightCart(event){

  let currentParent = event.currentTarget.parentNode;
  let currentGrandParent = event.currentTarget.parentNode.parentNode;
  let currentFlight = currentGrandParent.querySelector('.flightName').innerHTML;
  let currentAmount = parseInt(currentParent.querySelector('.buttonAmountMiddle').innerHTML);
  let currentPrice = parseInt(currentGrandParent.querySelector('.flexFlightsItemInnerRightInnerInnerPrice').getAttribute("data-flightPrice"));
  let currentPriceDisplay = currentGrandParent.querySelector('.flexFlightsItemInnerRightInnerInnerPrice').innerHTML;

  flightsInCart.push({flightName: currentFlight, flightAmount: currentAmount, flightPrice: currentPrice, flightPriceDisplay: currentPriceDisplay});

  // If flight has been added, hide - +, and change text to "In Cart", and un-clickable
  currentParent.querySelector('.buttonAmountLeft').classList.add('hideValue');
  currentParent.querySelector('.buttonAmountRight').classList.add('hideValue');
  event.currentTarget.innerHTML = "In Cart";
  currentParent.querySelector('.buttonAmount').classList.remove('buttonClickAble');
  event.currentTarget.classList.remove('buttonClickAble');
  
}

function getModalValues(){

  let flightTotal = 0;

  // Content to be displayed in modal
  // Heading "row"
  let cartModalBodyContent = `
    
    <table class="table">
    <thead>
    <tr>
    <th scope="col">Name of Flight</th>
    <th scope="col">Amount of tickets</th>
    <th scope="col">Price per ticket</th>
    <th scope="col">Total of flight</th>
    <th scope="col" colspan="3">Changes to flight</th>
    </tr>
    </thead>
    <tbody>
    
  `;

  // For each flight in the array
  for (let i = 0; i < flightsInCart.length; i++) {

    // Testing
    console.log(flightsInCart[i])

    // Total price per flight = Amount of tickets per flight * Price per ticket
    flightTotal += flightsInCart[i].flightAmount * flightsInCart[i].flightPrice;

    // Content to be displayed, as per the array
    cartModalBodyContent += `
  
      <tr>
      <th class="flightNameModal" scope="row">${flightsInCart[i].flightName}</th>
      <td class="flightAmountModal">${flightsInCart[i].flightAmount}</td>
      <td class="flightPriceModal">R<span>${flightsInCart[i].flightPrice}</span></td>
      <td class="flightTotalModal">R<span>${flightsInCart[i].flightAmount * flightsInCart[i].flightPrice}</span></td>
      <td class="flightChangesModal"><span class="modalMore">+</span></td>

    `;  

    if (flightsInCart[i].flightAmount == 1) {

      cartModalBodyContent += `
  
        <td class="flightChangesModal"><span class="modalLess hideValue">-</span></td>

      `;

    } else {

      cartModalBodyContent += `
  
        <td class="flightChangesModal"><span class="modalLess">-</span></td>

      `;

    }

    cartModalBodyContent += `

      <td class="flightChangesModal"><span class="modalRemove">x</span></td>
      </tr>

    `;
  }

  // Final "row" with total
  cartModalBodyContent += `
  
    </tbody>
    <tfoot>
    <th scope="row">Final Total:</th>
    <td colspan="2"></td>
    <td class="flightFinalTotalModal">R<span>${flightTotal}</span></td>
    <td colspan="3"></td>
    </tfoot>

  `;

  // Final closing tag
  cartModalBodyContent += `
  
    </table>

  `;

  // Using querySelector for classes
  let cartModalBody = cartModal.querySelector('.modal-body .modalBodyFlights');

  // Placed html into "inner part" of id container
  cartModalBody.innerHTML = cartModalBodyContent;

  // Adding event listeners here as elements does not exist earlier
  let modalMore = document.querySelectorAll('.modalMore');
  // Does the modalMore element exist? 
  if (modalMore) { 
    modalMore.forEach(el => el.addEventListener('click', adjustFlightAmountMoreModal));
  }

  let modalLess = document.querySelectorAll('.modalLess');
  // Does the modalLess element exist? 
  if (modalLess) { 
    modalLess.forEach(el => el.addEventListener('click', adjustFlightAmountLessModal));
  }

  let modalRemove = document.querySelectorAll('.modalRemove');
  // Does the modalRemove element exist? 
  if (modalRemove) { 
    modalRemove.forEach(el => el.addEventListener('click', adjustFlightAmountRemoveModal));
  }

}

function adjustFlightAmountMoreModal(event){

  /**
  // 1. Increase the amount in the cart
  let parentNode = event.currentTarget.parentNode;
  let currentGrandParent = event.currentTarget.parentNode.parentNode;

  let currentFlightName = currentGrandParent.querySelector('.flightNameModal').innerHTML;

  let currentAmount = parseInt(currentGrandParent.querySelector('.flightAmountModal').innerHTML);
  currentAmount++;
  currentGrandParent.querySelector('.flightAmountModal').innerHTML = currentAmount;

  // 2. Increase the amount on the Flights page
  flightContent.forEach(function(el) {
    if (el.querySelector('.flightName').innerHTML == currentFlightName){
      el.querySelector('.buttonAmountMiddle').innerHTML = currentAmount;
    }
  });

  // 3. Increase the amount in the array
  for (let i = 0; i < flightsInCart.length; i++) {

  }



  // 4. Update the totals - total of flight


  // 5. Update the totals - final total
  **/

  // 1. Update the array
  let currentParentNode = event.currentTarget.parentNode;
  let currentGrandParent = event.currentTarget.parentNode.parentNode;

  let currentFlightName = currentGrandParent.querySelector('.flightNameModal').innerHTML;
  let currentAmount = 0;

  for (let i = 0; i < flightsInCart.length; i++) {

    if (flightsInCart[i].flightName == currentFlightName) {

      flightsInCart[i].flightAmount++;
      currentAmount = flightsInCart[i].flightAmount;

    }

  }

  // 2. Update the amount on the page
  flightContent.forEach(function(el) {
    if (el.querySelector('.flightName').innerHTML == currentFlightName){
      el.querySelector('.buttonAmountMiddle').innerHTML = currentAmount;
    }
  });

  // 3. Refresh modal - call function
  getModalValues();

}


function adjustFlightAmountLessModal(event){

  // 1. Update the array
  let currentParentNode = event.currentTarget.parentNode;
  let currentGrandParent = event.currentTarget.parentNode.parentNode;

  let currentFlightName = currentGrandParent.querySelector('.flightNameModal').innerHTML;
  let currentAmount = 0;

  for (let i = 0; i < flightsInCart.length; i++) {

    if (flightsInCart[i].flightName == currentFlightName) {

      // Only -1 if amount is more than 1
      if (flightsInCart[i].flightAmount > 1){
        flightsInCart[i].flightAmount--;
        currentAmount = flightsInCart[i].flightAmount;
      } else {
        currentAmount = 1;
      }

    }

  }

  // 2. Update the amount on the page
  flightContent.forEach(function(el) {
    if (el.querySelector('.flightName').innerHTML == currentFlightName){
      el.querySelector('.buttonAmountMiddle').innerHTML = currentAmount;
    }
  });

  // 3. Refresh modal - call function
  getModalValues();

}

function adjustFlightAmountRemoveModal(event){

    // 1. Update the array
  let currentParentNode = event.currentTarget.parentNode;
  let currentGrandParent = event.currentTarget.parentNode.parentNode;

  let currentFlightName = currentGrandParent.querySelector('.flightNameModal').innerHTML;
  let currentAmount = 0;

  for (let i = 0; i < flightsInCart.length; i++) {

    if (flightsInCart[i].flightName == currentFlightName) {

      flightsInCart.splice(i, 1);

    }

  }

  // 2. Update the amount on the page
  // 3. Show + on the page and add class back
  // 4. Change Button text back to Book Now and hide button
  flightContent.forEach(function(el) {
    if (el.querySelector('.flightName').innerHTML == currentFlightName){
      el.querySelector('.buttonAmountMiddle').innerHTML = 0;
      el.querySelector('.buttonAmountRight').classList.remove('hideValue');
      el.querySelector('.buttonAmount').classList.add('buttonClickAble');
      el.querySelector('.buttonBookNow').innerHTML = "Book Now";
      el.querySelector('.buttonBookNow').classList.add('hideValue');
      el.querySelector('.buttonBookNow').classList.add('buttonClickAble');
      
    }
  });

  // 5. Refresh modal - call function
  getModalValues();

}


/** CONTACT **/
/** Get form with name of contact */
let contactForm = document.forms["contact"];
let contactFormClose = document.querySelector('.buttonContactModelClose');


// Does the contactForm element exist? 
if (contactForm) { 
  //When form submits (event of submitting), call the getValues function
  contactForm.addEventListener("submit", getValues);

  // Close Popup click event
  contactFormClose.addEventListener("click", closeContactPopup);

}

function getValues(event){

  // Stops the "normal" submitting process/event from happening
  event.preventDefault();

  // Get value entered into input with name attribute
  let formData = {

    "name": this.name.value

  }

  // Content that will be alerted to user
  let toShow = `
    
    Thank you for the message ${formData.name}
    
  `;

  // Alert content
  //alert(toShow);

  // Add content to popup
  document.getElementById("contactModal").querySelector('.contactModelMessage').innerHTML = toShow;

  // Show popup
  document.getElementById("contactModal").classList.add('showValue');

}

function closeContactPopup(event){

  // Remove content from popup
  document.getElementById("contactModal").querySelector('.contactModelMessage').innerHTML = "";

  // Hide popup
  document.getElementById("contactModal").classList.remove('showValue');

}



/** SEARCH BAR HEADER **/
let currentURL = window.location.href;

// Get the search button by id
let searchButton = document.getElementById('searchButton');
// Does the searchButton element exist? 
if (searchButton) { 
  // When user presses on the search icon, call the getSearchPage function
  searchButton.addEventListener('click', getSearchPage);
}

function getSearchPage(event){

  // What was the user searching for?
  let userSearch = document.getElementById("searchBarHead").value;

  if (currentURL.toLowerCase().includes('/pages/')){
    // If not on home page, do not add pages to href
    window.location.href = 'search.html?s='+userSearch;
  } else {
    window.location.href = 'pages/search.html?s='+userSearch;
  }  

}

/** SEARCH RESULT **/
// Check if URL contains search keyword, but only on results page
checkURL();

function checkURL() {

  // Are we on the results page?
  if (currentURL.toLowerCase().includes('search.html')){
    
    // We are on results page
    // What was the user searching for?
    let searchQueryPosition = currentURL.indexOf("?s=");
    let searchQuery = currentURL.substr(searchQueryPosition+3);

    // Add the query to the search box on the page
    document.getElementById("searchbox").value = searchQuery;

    // Run the function
    liveSearch();
    
  }
}

function liveSearch() {

  // Get all the result cards
  let resultCards = document.querySelectorAll('.card')

  // What was the user searching for?
  let searchQuery = document.getElementById("searchbox").value;

  // Loop through the result cards
  for (let i = 0; i < resultCards.length; i++) {

    // Does this result card contain the text that the user is looking for?
    if(resultCards[i].innerText.toLowerCase().includes(searchQuery.toLowerCase())) {
      
      // It does, so show result card
      resultCards[i].classList.remove("isHidden");

    } else {

      // It does not, so hide the result card
      resultCards[i].classList.add("isHidden");

    }
  }
}


/** IMAGE SLIDER **/
// Get the search button by id
let homeImgSlider = document.getElementById('homeImgSlider');
let currentImgSlider = 0;
// Does the searchButton element exist? 
if (homeImgSlider) { 

  homeImgSlider.querySelector('.homeImgSliderLeft').addEventListener("click", imgSliderLeft);
  homeImgSlider.querySelector('.homeImgSliderRight').addEventListener("click", imgSliderRight);

  imgSliderShowImage(0)

}

function imgSliderLeft(event) {

  imgSliderShowImage(-1);

}

function imgSliderRight(event) {

  imgSliderShowImage(1);

}


function imgSliderShowImage(imgNumber) {

  let imagesSlider = homeImgSlider.querySelector('.homeImgSliderImgHolder').children;
  imagesSlider.item(currentImgSlider).classList.remove('showImage');

  if (imgNumber == -1) {
    // Left button
    if (currentImgSlider == 0) {
      currentImgSlider = imagesSlider.length-1;
    } else {
      currentImgSlider--;
    }
  } else if (imgNumber == 1) {
    // Right button
    if (currentImgSlider == imagesSlider.length-1) {
      currentImgSlider = 0;
    } else {
      currentImgSlider++;
    }
  } else {
    // Default, or no change
  }

  imagesSlider.item(currentImgSlider).classList.add('showImage');

}