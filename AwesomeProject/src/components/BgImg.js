import { weatherType } from '../../assets/weatherType';

let bgImg;

if ( weatherType == 'Sunny') {
    bgImg = require('../../assets/images/sunny.png');
}
else if ( weatherType == 'Rainy') {
    bgImg = require('../../assets/images/rain.png');
}
else if ( weatherType == 'Cloudy') {
    bgImg = require('../../assets/images/cloudy.png');
}
else if ( weatherType == 'Night') {
    bgImg = require('../../assets/images/night.jpg');
}
else{
    console.log(weatherType);
    bgImg = require('../../assets/images/sunny.png');
}
export default bgImg;
