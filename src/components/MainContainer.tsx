import React,{useState} from 'react'
import axios from 'axios'
import{StyledMainContainer,
       StyledMainHeading,
       StyledForm,
       StyledInput,
       StyledButton,
       StyledMainInfoDisplay,
       StyledLocationInfo,
       StyledTimeInfo,
       StyledTempInfo,
       StyledTempNumber,
       StyledCelSymbol,
       StyledAdditionalInfo,
       StyledAdditionalInfoElement,
       StyledAdditionalInfoColumns
    } from './MainContainerStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCloudSun,faSun,faCloudShowersHeavy,faSmog,faCloud } from '@fortawesome/free-solid-svg-icons'
function MainContainer() {

// interface FormValue {
//     city:string,
//     country:string,
//     //setFormValues:React.Dispatch<React.SetStateAction<FormValue | undefined>>
// }

// const [formValues,setFormValues]=useState<FormValue>()

interface WeatherInfo {
    tempHigh:number,
    tempLow:number,
    tempAvg:number,
    windSpeed:number,
    windDirection:number,
    pressure:number,
    visibility:number,
    humidity:number,
    condition:string,
    sunrise:string,
    sunset:string,
    city:string,
    country:string,
    currentTime:string,
    isDataPresent:boolean,
    iconTouse:any
}


const [city,setCity] = useState<string>()
const [country,setCountry] = useState<string>()

const[info,setInfo] = useState<WeatherInfo>({
    tempHigh:0,
    tempLow:0,
    tempAvg:0,
    windSpeed:0,
    windDirection:0,
    pressure:0,
    visibility:0,
    humidity:0,
    condition:"",
    sunrise:"",
    sunset:"",
    city:"",
    country:"",
    currentTime:"",
    isDataPresent:false,
    iconTouse:"",
})
const convertUnixstamp = (stamp:number) => {
var currentDate = new Date(stamp *1000)

var hours = currentDate.getHours()
var mins = currentDate.getMinutes()
var secs = currentDate.getSeconds()
var formattedDate = hours+":"+mins+":"+secs
return formattedDate
}

const getIcon = (condition:string) => {
    switch(condition)
    {
        case 'Haze':
            return faCloudSun
        case 'Clear':
                return faSun
        case 'Rain':
            return faCloudShowersHeavy
        case 'Clouds':
            return faCloud
        case 'Smoke':
            return faSmog
        case 'Haze':
            return faSmog
        default:
            return faSun
    }
}

const onSubmit = async (e:any) => {
    e.preventDefault()
    console.log("form submitted")
    console.log("city,country",city,country)
    console.log("info",info?.tempHigh)


    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=66c2350338b0759b3dda256aac3e3ba1&units=metric`)
    .then((result) => {
        var sunrise = convertUnixstamp(result.data.sys.sunrise)
        var sunset = convertUnixstamp(result.data.sys.sunset)
        var currentTime = convertUnixstamp(result.data.dt)
        var visibility = Math.floor(result.data.visibility/1000)
        var iconTouse = getIcon(result.data.weather[0].main)
        console.log(result)
        setInfo({...info,
                tempHigh:result.data.main.temp_max,
                tempLow:result.data.main.temp_min,
                tempAvg:result.data.main.temp,
                humidity:result.data.main.humidity,
                pressure:result.data.main.pressure,
                windSpeed:result.data.wind.speed,
                windDirection:result.data.wind.deg,
                visibility:visibility,
                condition:result.data.weather[0].main,
                sunrise:sunrise,
                sunset:sunset,
                currentTime:currentTime,
                city:result.data.name,
                country:result.data.sys.country,
                isDataPresent:true,
                iconTouse:iconTouse
            })
        console.log("infy",info?.tempHigh)
    })
}
  return (
    <StyledMainContainer>
        <StyledMainHeading>
            <h1>Weather App</h1>
        </StyledMainHeading>
        <StyledForm>
            <StyledInput type={'text'} name={'city'} placeholder={'CITY'} value={city} onChange={(e) => {setCity(e.target.value)}} />
            <StyledInput type={'text'} name={'country'} placeholder={'COUNTRY'} value={country} onChange={(e) => {setCountry(e.target.value)}} />
            <StyledButton onClick={(e) => {onSubmit(e)}}>Submit</StyledButton>
        </StyledForm>
        { info.isDataPresent ?
        <>
        <StyledMainInfoDisplay>
            <div className='locationInfoHeading'>
                <StyledLocationInfo>{info.city}, {info.country} Weather</StyledLocationInfo><br/><StyledTimeInfo>As of {info.currentTime}</StyledTimeInfo>
            </div>

            <StyledTempInfo>
            <StyledTempNumber><strong>{info.tempAvg} <StyledCelSymbol>&#176;</StyledCelSymbol></strong></StyledTempNumber>
            <div>
            <FontAwesomeIcon icon={info.iconTouse} style={{fontSize:"40pt"}} />
            <p>{info.condition}</p>
            </div>
            </StyledTempInfo>
            {info.condition} <br />
        </StyledMainInfoDisplay>
        <StyledAdditionalInfo>
            <StyledAdditionalInfoColumns>
            <StyledAdditionalInfoElement>
                <p><strong>High/Low:</strong></p>
                <p>{info.tempHigh}/{info.tempLow}</p>
            </StyledAdditionalInfoElement>

            <StyledAdditionalInfoElement>
                <p><strong>humidity:</strong></p>
                <p>{info.humidity} %</p>
            </StyledAdditionalInfoElement>

            <StyledAdditionalInfoElement>
                <p><strong>pressure:</strong></p>
                <p>{info.pressure} hPa</p>
            </StyledAdditionalInfoElement>

            <StyledAdditionalInfoElement>
                <p><strong>visibility:</strong></p>
                <p>{info.visibility} km</p>
            </StyledAdditionalInfoElement>
            </StyledAdditionalInfoColumns>

            <StyledAdditionalInfoColumns>
            <StyledAdditionalInfoElement>
                <p><strong>wind:</strong></p>
                <p>{info.windSpeed} km/hr</p>
            </StyledAdditionalInfoElement>

            <StyledAdditionalInfoElement>
                <p><strong>windDirection:</strong></p>
                <p>{info.windDirection}<span>&#176;</span> deg</p>
            </StyledAdditionalInfoElement>

            <StyledAdditionalInfoElement>
                <p><strong>sunrise:</strong></p>
                <p>{info.sunrise}</p>
            </StyledAdditionalInfoElement>

            <StyledAdditionalInfoElement>
                <p><strong>sunset:</strong></p>
                <p>{info.sunset}</p>
            </StyledAdditionalInfoElement>
             
            </StyledAdditionalInfoColumns>
        </StyledAdditionalInfo>
        </>:<div style={{textAlign:"center"}}><h3>Please enter city and country to see the result</h3></div>
}
    </StyledMainContainer>
  )
}

export default MainContainer