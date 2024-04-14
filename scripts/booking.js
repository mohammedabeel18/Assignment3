/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? Variables like rateFullDay, rateHalfDay, and selectedDays are initialized when the page is loaded.
// When do they need to be reset or updated?selectedDays is reset when clearing days, and the cost is updated whenever there's a change in selection.
document.addEventListener("DOMContentLoaded", function() 
 {
    // Variables
    let rateFullDay = 25; // Cost per full day - Initialized when the page is loaded.
    let rateHalfDay = 15; // Cost per half day - Initialized when the page is loaded.
    let selectedDays = []; // Array to store selected days - Initialized when the page is loaded.
  
    // Elements
    const daySelectors = document.querySelectorAll('.day-selector li');
    const fullButton = document.getElementById('full');
    const halfButton = document.getElementById('half');
    const clearButton = document.getElementById('clear-button');
    const calculatedCost = document.getElementById('calculated-cost');
  
    /********* colour change days of week *********/
    // when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
    // added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!
  
    // Function to handle day selection
    function selectDay(day) {
      if (!day.classList.contains('clicked')) {
        day.classList.add('clicked');
        const isHalfDay = (day === halfButton); // Check if it's a half day
        selectedDays.push({ day: day.id, isHalfDay: isHalfDay });
        calculateCost();
      }
    }
  
    // Event listeners for day selectors
    daySelectors.forEach(day => {
      day.addEventListener('click', function() {
        selectDay(day);
      });
    });
  
    /********* clear days *********/
    // when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.
    
    // Function to handle clearing days
    function clearDays() {
      selectedDays.forEach(day => {
        document.getElementById(day.day).classList.remove('clicked');
      });
      selectedDays = []; // Reset selected days array
      calculatedCost.textContent = '0'; // Reset calculated cost
    }
  
    // Event listener for clear button
    clearButton.addEventListener('click', function() {
      clearDays();
    });
  
    /********* change rate *********/
    // when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
    // when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.
  
    // Event listener for half day button
    halfButton.addEventListener('click', function() {
      halfButton.classList.add('clicked');
      fullButton.classList.remove('clicked');
      rateFullDay = 20; // Set rate for half day
      calculateCost(); // Recalculate cost
    });
  
    // Event listener for full day button
    fullButton.addEventListener('click', function() {
      fullButton.classList.add('clicked');
      halfButton.classList.remove('clicked');
      rateFullDay = 35; // Set rate for full day
      calculateCost(); // Recalculate cost
    });
  
    /********* calculate *********/
    // when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value
  
    // Function to calculate the total cost
    function calculateCost() {
      let totalCost = 0;
      selectedDays.forEach(day => {
        if (day.isHalfDay) {
          totalCost += rateHalfDay;
        } else {
          totalCost += rateFullDay;
        }
      });
      calculatedCost.textContent = totalCost;
    }
  });


