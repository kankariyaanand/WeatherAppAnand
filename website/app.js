// Personal API Key for OpenWeatherMap API
const apiKey = '1b6fe57c916989b752fb44e751495682&units=imperial';

//https://api.openweathermap.org/data/2.5/weather?zip=10001&appid=1b6fe57c916989b752fb44e751495682&units=imperial

// Event listener to add function to existing HTML DOM element
const element = document.getElementById('generate').addEventListener('click', performAction);
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function called by event listener */
function performAction(e) {
    const sZip = document.getElementById("zip").value;
    const sFeeling = document.getElementById("feelings").value;
   const sUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" + sZip + "&appid=" + apiKey;
   getData(sUrl)
    .then(function(data) {
    let sData = JSON.stringify(data);
    const oData = JSON.parse(sData);

     //read zip, temp value from GET response and pass to POST call
    postData("/addEntry", {zip:sZip, temperature:oData.main.temp, date:newDate, feelings:sFeeling});
    //data.main.feels_like
    }).then(updateUI())
};

/* Function to GET Web API Data*/
const getOptions={
    hostname:'api.openweathermap.org',
    path:'/data/2.5/weather',
    method:'GET',
};

const getData = async (url)=>{
    console.log("GetData()");
    const data = await fetch(url);
    try {
        const newData = await data.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
}

/* Function to POST data */

/* Function to POST Project Data */
const postData = async ( url = '', data = {})=>{
      console.log("test" + data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
   });
  
      try {
        const newData = await response.json();
        console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

  /* Function to Update UI */
  const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData[0].date;
      document.getElementById('temp').innerHTML = allData[0].temperature;
      document.getElementById('content').innerHTML = allData[0].feelings;
      document.getElementById('zipCode').innerHTML = allData[0].zip;
    }catch(error){
      console.log("error", error);
    }
  }