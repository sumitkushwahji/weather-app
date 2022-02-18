const submitBtn= document.getElementById('submitBtn');
const cityName=document.getElementById('cityName');
const city_name =document.getElementById('city_name')
const temp_status =document.getElementById('temp_status');
const temp_real_value =document.getElementById('temp_real_value');

const datahide =document.querySelector('.middle_layer');


const getinfo= async(event)=>{
    event.preventDefault();
    let cityVal= cityName.value;
    datahide.classList.add('data_hide');

    if(cityVal==""){
        city_name.innerText = `write the name before search`;
        
    }else{
        try{
            let url= `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=f1ae03d71b96dfef01e894db6f141274`
            const response =await fetch(url);
            const data= await response.json();
            console.log(data);
            const arrData=[data];
            temp_real_value.innerText = arrData[0].main.temp;            
            temp_status.innerText = arrData[0].weather[0].main;
            city_name.innerText =`${arrData[0].name},${arrData[0].sys.country}`;
            datahide.classList.remove('data_hide');
        

        }
        catch{
            city_name.innerText=`enter correct details`;
            datahide.classList.add('data_hide');
        }
      
    }

}
submitBtn.addEventListener('click',getinfo);