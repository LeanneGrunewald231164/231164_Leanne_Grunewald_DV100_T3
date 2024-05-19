let flightsInCart = new Array();

// TEST DATA FOR DISPLAY PURPOSES
flightsInCart.push({flightName: "Moonlight Meander", amount: 1});
flightsInCart.push({flightName: "Uranus Uncharted", amount: 2});



// When pressing on the button and not yet in the array, add to the array, else add in array
// if 0 = remove from array, or min

// const person = {firstName:"John", lastName:"Doe", age:46};
// person.firstName returns John:

// const fruits = ["Banana", "Orange", "Apple", "Mango"];

const cartModal = document.getElementById('cartModal')
cartModal.addEventListener('show.bs.modal', function (event) {

  let cartModalBodyContent = "<div class=\"container-fluid\">";

  for (let i = 0; i < flightsInCart.length; i++) {
    console.log(flightsInCart[i])
    cartModalBodyContent += "<div class=\"row\">";
    cartModalBodyContent += "<div class=\"col\">" + flightsInCart[i].flightName + "</div>";
    cartModalBodyContent += "<div class=\"col\">.col-md-4 .ms-auto</div>";
    cartModalBodyContent += "</div>";
  }

  // Update the modal's content.
  let cartModalBody = cartModal.querySelector('.modal-body .modalBodyFlights');

  cartModalBody.innerHTML = cartModalBodyContent;

})