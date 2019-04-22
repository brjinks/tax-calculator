//Calculate Self-employment Tax
function getSelfEmploymentTax(AGI) {
  let selfEmploymentTax = AGI * 0.153;
  return selfEmploymentTax;
}

//Get Standard Deduction
function getStandard(filingStatus) {
  var standard = 0;
  if (filingStatus === "Single") {
    standard = 12200;
  } else if (filingStatus === "Head of Household") {
    standard = 18350;
  } else {
    standard = 24400;
  }

  return standard;
}
//Calculate Income Tax
function getIncomeTax(AGI, filingStatus) {
  debugger;
  let taxableIncome = AGI - getStandard(filingStatus);
  let incomeTax = 0;
  //Single or MFS
  if (filingStatus === "Single") {
    if (taxableIncome > 84200) {
      incomeTax = 14382.5 + (taxableIncome - 84200) * 0.24;
    } else if (taxableIncome > 39475) {
      incomeTax = 4543 + (taxableIncome - 39475) * 0.22;
    } else if (taxableIncome > 9700) {
      incomeTax = 970 + (taxableIncome - 9700) * 0.12;
    } else {
      incomeTax = taxableIncome * 0.1;
    }
    if (incomeTax < 0) {
      incomeTax = 0;
    }
  } //Head of Household
  else if (filingStatus === "Head of Household") {
    if (taxableIncome > 84200) {
      incomeTax = 12962 + (taxableIncome - 84200) * 0.24;
    } else if (taxableIncome > 52850) {
      incomeTax = 6065 + (taxableIncome - 52850) * 0.22;
    } else if (taxableIncome > 13850) {
      incomeTax = 1385 + (taxableIncome - 13850) * 0.12;
    } else {
      incomeTax = taxableIncome * 0.1;
    }
    if (incomeTax < 0) {
      incomeTax = 0;
    }
  } //Married Filing Jointly
  else {
    if (taxableIncome > 168400) {
      incomeTax = 28765 + (taxableIncome - 168400) * 0.24;
    } else if (taxableIncome > 78950) {
      incomeTax = 9086 + (taxableIncome - 78950) * 0.22;
    } else if (taxableIncome > 19400) {
      incomeTax = 1940 + (taxableIncome - 19400) * 0.12;
    } else {
      incomeTax = taxableIncome * 0.1;
    }
    if (incomeTax < 0) {
      incomeTax = 0;
    }
  }
  return incomeTax;
}

//Add SE and Income Tax
function getTotalTax(AGI, filingStatus) {
  return getSelfEmploymentTax(AGI) + getIncomeTax(AGI, filingStatus);
}

//Listen for form submit
document.getElementById("submit").addEventListener("click", displayTax);

//Retrieve Input for Calculation
function displayTax(e) {
  //get input
  var expectedIncome = document.getElementById("expectedIncome").value;
  var filingStatus = document.getElementById("dropdown").value;
  e.preventDefault();

  //Calculate tax
  var tax =
    Math.round((getTotalTax(expectedIncome, filingStatus) + 0.00001) * 100) /
    100;
  var quarterlytax = Math.round((tax / 4 + 0.00001) * 100) / 100;
  //Add to document
  var result = document.getElementById("result");
  result.innerHTML =
    "<h3>Your estimated annual tax is $" +
    tax +
    ". " +
    "Make quarterly estimated tax payments of at least $" +
    quarterlytax +
    ".</h3>";
}
