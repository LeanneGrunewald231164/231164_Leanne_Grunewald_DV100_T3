/** FLIGHTS **/
// ToDo: Add check to only run on Flights page
const decAmount = document.querySelectorAll('.buttonAmount .buttonAmountLeft');
decAmount.forEach(el => el.addEventListener('click', adjustFlightAmountLess));

const incAmount = document.querySelectorAll('.buttonAmount .buttonAmountRight');
incAmount.forEach(el => el.addEventListener('click', adjustFlightAmountMore));

const bookNowButton = document.querySelectorAll('.buttonBookNow');
bookNowButton.forEach(el => el.addEventListener('click', adjustFlightCart));

function adjustFlightAmountLess(event){

  //Testing:
  //console.log(event.target.getAttribute("data-el"));

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

function adjustFlightCart(event){

  // If flight has been added, hide - +, and change text to "In Cart"
  
  
}


/** STILL IN PROGRESS **/

// Array containing the flights
let flightsInCart = [];

// TEST DATA FOR DISPLAY PURPOSES AND TEST PURPOSES
// Each array entry contains an object containing the details of the flight added
flightsInCart.push({flightName: "Moonlight Meander", flightAmount: 1, flightPrice: "15000"});
flightsInCart.push({flightName: "Uranus Uncharted", flightAmount: 2, flightPrice: "50000"});

let flightTotal = 0;


// ToDo: When pressing the "Book now" button, check if flight is in cart, if it is, increment the amount with the amount on the button (next to Book now). If not, add to array.
// ToDo: Change the button from "Book now" to "Remove" once flight has been added to the cart. Remove flight from basket and change button back when user press the "Remove" button

// Get the Modal by id
const cartModal = document.getElementById('cartModal');
// Does the modal element exist? 
if (cartModal) {
  
  // When user presses on the "View Cart" button, call the getModalValues function
  cartModal.addEventListener('show.bs.modal', getModalValues);

}

function getModalValues(){

  // Content to be displayed in modal
  // Uses Bootstrap grid for display, but can be changed to tables
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
    // As mentioned, uses Bootstrap grid for display, but can be changed to tables
    cartModalBodyContent += `
  
      <tr>
      <th scope="row">${flightsInCart[i].flightName}</th>
      <td>${flightsInCart[i].flightAmount}</td>
      <td>R${flightsInCart[i].flightPrice}</td>
      <td>R${flightsInCart[i].flightAmount * flightsInCart[i].flightPrice}</td>
      <td><span>+</span></td>
      <td><span>-</span></td>
      <td><span>x</span></td>
      </tr>

    `;
  }

  // Final "row" with total
  cartModalBodyContent += `
  
    </tbody>
    <tfoot>
    <th scope="row">Final Total:</th>
    <td colspan="2"></td>
    <td>R${flightTotal}</td>
    <td colspan="3"></td>
    </tfoot>

  `;

  // Final div to close container
  cartModalBodyContent += `
  
    </table>

  `;

  // Using querySelector for classes
  let cartModalBody = cartModal.querySelector('.modal-body .modalBodyFlights');

  // Placed html into "inner part" of id container
  cartModalBody.innerHTML = cartModalBodyContent;

}



/** CONTACT **/
/** Get form with name of contact */
let form = document.forms["contact"];

/** When form submits (event of submitting), call the getValues function */
//form.addEventListener("submit", getValues);

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
  alert(toShow);

}