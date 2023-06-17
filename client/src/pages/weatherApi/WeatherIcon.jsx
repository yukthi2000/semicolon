import m01d from './weatherIcons/01d.svg';
import m01n from './weatherIcons/01n.svg';
import m02d from './weatherIcons/02d.svg';
import m02n from './weatherIcons/02n.svg';
import m03d from './weatherIcons/03d.svg';
import m03n from './weatherIcons/03n.svg';
import m04d from './weatherIcons/04d.svg';
import m04n from './weatherIcons/04n.svg';
import m09d from './weatherIcons/09d.svg';
import m09n from './weatherIcons/09n.svg';
import m10d from './weatherIcons/10d.svg';
import m10n from './weatherIcons/10n.svg';
import m11d from './weatherIcons/11d.svg';
import m11n from './weatherIcons/11n.svg';
import m13d from './weatherIcons/13d.svg';
import m13n from './weatherIcons/13n.svg';
import m50d from './weatherIcons/50d.svg';
import m50n from './weatherIcons/50n.svg';
import nA from './weatherIcons/NA.svg';

const weatherIcons = {
  '01d': m01d,
  '01n': m01n,
  '02d': m02d,
  '02n': m02n,
  '03d': m03d,
  '03n': m03n,
  '04d': m04d,
  '04n': m04n,
  '09d': m09d,
  '09n': m09n,
  '10d': m10d,
  '10n': m10n,
  '11d': m11d,
  '11n': m11n,
  '13d': m13d,
  '13n': m13n,
  '50d': m50d,
  '50n': m50n,
  'NA' : nA,
};

const WeatherIcon = (iconCode) => {
  const icon = weatherIcons[iconCode] || nA; // display "Not available icon"  if icon code is not recognized
  return icon;
};

export default WeatherIcon;
