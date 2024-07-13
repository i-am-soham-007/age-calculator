'use strict';

function validateInput(type) {
    var day = parseInt(document.getElementById('day').value, 10);
    var month = parseInt(document.getElementById('month').value, 10);
    var year = parseInt(document.getElementById('year').value, 10);

    if (!isValidDate(Number(day), Number(month), Number(year))) {
        alert('Invalid date input');
        if(type =='day'){
            document.getElementById('day').value ='';
        }else if(type =='month') {
            document.getElementById('month').value ='';
        }else if(type =='year') {
            document.getElementById('year').value ='';
        }
        
        return false;
    }
    return true;
}

document.getElementById('calculate').addEventListener('click', function(e) {
    document.getElementById('output').classList.remove('d-none');
    const firstName = document.getElementById('firstName').value || '';
    const lastName = document.getElementById('lastName').value || '';
    let greeting = " Your";
    if(firstName != '' && lastName != '') {
        greeting = firstName + ' ' + lastName + ' your ';
    }

    const day = document.getElementById('day').value || 0;
    const month = document.getElementById('month').value || 0;
    const year = document.getElementById('year').value || 0;
    if(day == 0 || month == 0 || year == 0) {
        alert('Please enter valid date of birth');
        return;
    }
    var age = calculateAge(day, month, year);
    document.getElementById('output').innerHTML = `${greeting} age is <strong>${age.years} </strong>years <strong>${age.months}</strong> months and <strong>${age.days}</strong> days are old.`;
    e.preventDefault();
});

document.getElementById('reset').addEventListener('click',reset)


function isValidDate(day, month, year) {
   
    var today = new Date();
    // Check ranges for day, month, year
    if (year < 0 || year > today.getFullYear() || month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }

    // Check if the date is in the future
    if (year === today.getFullYear() && (month > (today.getMonth() + 1) || (month === (today.getMonth() + 1) && day > today.getDate()))) {
        return false;
    }

    // Check days in February (leap year check)
    if (month === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            // Leap year
            if (day > 29) {
                console.log('leap year');
                return false;
            }
        } else {
            // Not a leap year
            if (day > 28) {
                console.log('not leap year');
                return false;
            }
        }
    }

    // Check days in April, June, September, November
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
        console.log('chek APPRIl');
        return false;
    }

    return true;
}


function reset() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('day').value = '' ;
    document.getElementById('month').value = '';
    document.getElementById('year').value = '';
    document.getElementById('output').classList.add('d-none');
}
function calculateAge(day, month, year) {
    var today = new Date();
    var birthDate = new Date(year, month - 1, day); // month is 0-based in JavaScript Date

    var ageYears = today.getFullYear() - birthDate.getFullYear();
    var ageMonths = today.getMonth() - birthDate.getMonth();
    var ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        var lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // get the last day of the previous month
        ageDays += lastMonth.getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    return {
        years: ageYears,
        months: ageMonths,
        days: ageDays
    };
}