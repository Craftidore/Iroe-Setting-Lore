const earthMonths = {
    "january":"Slowakius",
    "february":"Month of Dreams",
    "march":"Oxors",
    "april":"Drorsh",
    "may":"Dofant",
    "june":"Stupe",
    "july":"Month of Secrets",
    "august":"Vlupets",
    "september":"Haqahs",
    "october":"Guwisp",
    "november":"Cluix",
    "december":"Jitoh",
}
const iroeMonths = {
    "slowakius":"January",
    "month-of-dreams":"February",
    "oxors":"March",
    "drorsh":"April",
    "dofant":"May",
    "stupe":"June",
    "month-of-secrets":"July",
    "vlupets":"August",
    "haqahs":"September",
    "guwisp":"October",
    "cluix":"November",
    "jitoh":"December",
}
function toIroe(event) {
    event.preventDefault();
    const element = document.querySelector('#earth-months');
    console.log(element.value);
    console.log(earthMonths[element.value]);
    document.querySelector('#to-iroe-result').innerText = earthMonths[element.value];
}

function toEarth(event) {
    event.preventDefault();
    const element = document.querySelector('#iroe-months');
    console.log(element.value);
    console.log(iroeMonths[element.value]);
    document.querySelector('#to-earth-result').innerText = iroeMonths[element.value];
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#to-iroe-form').addEventListener('submit', toIroe);
    document.querySelector('#to-earth-form').addEventListener('submit', toEarth);
});
