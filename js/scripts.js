/** FLIGHTS **/

let flightsInCart = new Array();

// TEST DATA FOR DISPLAY PURPOSES
flightsInCart.push({flightName: "Moonlight Meander", flightAmount: 1, flightPrice: "15000"});
flightsInCart.push({flightName: "Uranus Uncharted", flightAmount: 2, flightPrice: "50000"});

let flightTotal = 0;


// When pressing on the button and not yet in the array, add to the array, else add in array
// if 0 = remove from array, or minus

const cartModal = document.getElementById('cartModal')
if (cartModal) {
  cartModal.addEventListener('show.bs.modal', function (event) {

    let cartModalBodyContent = `
      
      <div class="container-fluid">
      <div class="row"><div class="col">Name of Flight:</div>
      <div class="col">Amount of tickets:</div>
      <div class="col">Price per ticket:</div>
      <div class="col">Total of flight:</div></div>

    `;
  
    for (let i = 0; i < flightsInCart.length; i++) {
      console.log(flightsInCart[i])

      flightTotal += flightsInCart[i].flightAmount * flightsInCart[i].flightPrice;

      cartModalBodyContent += `
    
        <div class="row"><div class="col">${flightsInCart[i].flightName}</div>
        <div class="col">${flightsInCart[i].flightAmount}</div>
        <div class="col">${flightsInCart[i].flightPrice}</div>
        <div class="col">${flightsInCart[i].flightAmount * flightsInCart[i].flightPrice}</div></div>
  
      `;
    }

    cartModalBodyContent += `
    
      <div class="row"><div class="col"><p>Final Total:</p></div>
      <div class="col"></div>
      <div class="col"></div>
      <div class="col">${flightTotal}</div></div>
  
    `;

    cartModalBodyContent += `
    
      </div>

    `;

    // Update the modal's content.
    let cartModalBody = cartModal.querySelector('.modal-body .modalBodyFlights');
  
    cartModalBody.innerHTML = cartModalBodyContent;
  
  })
}



/** CONTACT **/
let form = document.forms["contact"];
form.addEventListener("submit", getValues);

function getValues(event){

    event.preventDefault();

    let formData = {
        "name": this.name.value
    }

    let toShow = `
    
        Thank you for the message ${formData.name}
    
    `;

    alert(toShow);


}