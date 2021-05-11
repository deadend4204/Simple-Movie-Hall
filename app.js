const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.booked)");
const count = document.getElementById("count");
const cost = document.getElementById("cost");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;
console.log(ticketPrice);
//call getdata()
getData();
//save movie and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//update cost and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //copy selected seats into array //map through array
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  //get price storage data
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
  if (selectedMoviePrice !== null) {
    cost.innerText = selectedSeatsCount * selectedMoviePrice;
  } else {
    cost.innerText = selectedSeatsCount * ticketPrice;
  }
}
//get data from localstorage
function getData() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  //set movies data
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
//movie change event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("booked")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//call update
updateSelectedCount();
