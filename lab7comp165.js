function averaging() {
    let num1 = document.querySelector('#first_val').value;
    let num2 = document.querySelector('#second_val').value;
    
    if (!isNaN(num1) && !isNaN(num2)) { // Check if both inputs are valid numbers
        let average = (Number(num1) + Number(num2)) / 2;
        average = average.toFixed(2); // Limit average to two decimal places
        document.querySelector('#average').innerHTML = average;
    } else {
        document.querySelector('#average').innerHTML = "Invalid input";
    }
}
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#result').onclick = averaging;
});