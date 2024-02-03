
import { useEffect, useState } from 'react';
import Dropdown from './components/dropdown/Dropdown';
import styles from './App.module.css';

function App() {

  const[userSelect,setUserSelect] = useState({
    Country:'',
    State:'',
    City:'',
  })

  const[countries,setCountries] = useState([]);
  const[cStates,setCStates] = useState([]);
  const[cities,setCities] = useState([]);


  const handleSelect = (e) => {

    console.log(e.target.name);

      if(!(e.target.value).includes('Select')){
        console.log(e.target.value);
        setUserSelect( {...userSelect,[e.target.name]: e.target.value,});
      }     
  }
  
  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(json => setCountries(json))
      .catch(error => console.error(error));
  }, []);


  // for Calling StateAPI
  useEffect(() => {

    if(cStates.length != 0){
      setCStates([]);
      setCities([]);
    }

    fetch(` https://crio-location-selector.onrender.com/country=${userSelect.Country}/states`)
      .then(response => response.json())
      .then(json => setCStates(json))
      .catch(error => console.error(error));
  }, [userSelect.Country]);


   // for Calling CityAPI
   useEffect(() => {
    fetch(` https://crio-location-selector.onrender.com/country=${userSelect.Country}/state=${userSelect.State}/cities`)
      .then(response => response.json())
      .then(json => setCities(json))
      .catch(error => console.error(error));
  },[userSelect.State]);



  return (

    <div className={styles.container}>
  
          <h1>Select Location</h1>
  
      
      <div className={styles.dropdown}>
      <Dropdown name='Country' options={countries} OnSelect={handleSelect}/>
        {!userSelect.Country?
        <Dropdown name='State' options={cStates} OnSelect={handleSelect} disabled/>
        :
        <Dropdown name='State' options={cStates} OnSelect={handleSelect} />}
        
        {!userSelect.State?
         <Dropdown name='City' options={cities} OnSelect={handleSelect} disabled/>
         :
         <Dropdown name='City' options={cities} OnSelect={handleSelect} />
        }
      </div>

      {userSelect.City?<div> <b>You selected {userSelect.City}</b>, {userSelect.State}, {userSelect.Country}</div>:null}
       
    </div>
  );
}

export default App;
