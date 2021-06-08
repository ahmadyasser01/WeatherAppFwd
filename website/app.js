
/* Global Variables */
const generateButton = document.querySelector('#generate'),
    dateElement = document.getElementById('date'),
    tempElement = document.getElementById('temp'),
    contentElement = document.getElementById('content');


const apiKey = 'fb65972373a4e3039604fc1ff035ab0f';
const baseURl = `http://api.openweathermap.org/data/2.5/weather?zip=`;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();


//event handlers 
function generate() {
    const zipCode = document.getElementById('zip').value;
    const userFeeling = document.getElementById('feelings').value;
    getWeather(baseURl, zipCode, apiKey).then((data) => {
        post('/upload', { date: newDate, temperature: data['main']['temp'], content: userFeeling })
        updateUI();
    });

};

const getWeather = async function (baseURl, zipCode, apiKey) {
    const response = await (fetch(baseURl + zipCode + '&units=metric' + '&appid=' + apiKey));
    try {
        const data = await response.json();
        console.log(data.main.temp);
        return data;
    }
    catch (error) {
        console.log("Error happened, ", error)
    }

}

// add event listener to the button
generateButton.addEventListener('click', generate);


const post = async (baseURl = "", data = {}) => {
    const response = await fetch(baseURl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),

    });
    try {
        const resp = await response.json();
        console.log(response);
        return resp;
    }

    catch (error) {
        console.log(error);
    }
};


const updateUI = async () => {
    const resData = await fetch('/data');
    try {
        const outputData = await resData.json();
        dateElement.innerHTML = `Date: ${outputData.date}`;
        tempElement.innerHTML = `temperature:  ${outputData.temperature}`;
        contentElement.innerHTML = `I feel ${outputData.content} `;

    }
    catch (error) {
        console.log(error);
    }
};