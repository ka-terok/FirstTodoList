import React,{useState, useEffect} from 'react';
import humanizeDuration from 'humanize-duration'
import 'moment-precise-range-plugin';


const shortEnglishHumanizer=humanizeDuration.humanizer({
  language: "shortEn",
  languages: {
    shortEn: {
      y: () => "г.",
      mo: () => "мес.",
      w: () => "w",
      d: () => "д.",
      h: () => "ч.",
      m: () => "мин",
      s: () => "сек.",
      ms: () => "ms",
    },
  }, 
});

function Timer ({deadline}){
  const newValueTimer = () => {
    const now = new Date();
    return shortEnglishHumanizer(new Date(deadline).getTime() - now.getTime(), { units: ["y", "mo", "d", "h", "m", "s" ] ,  maxDecimalPoints: 0 })
  }

  const [timer, setTimer]=useState(newValueTimer())
  useEffect ( () => setTimer(newValueTimer()), [deadline])  

  function updtateTimer() {
    setInterval(() => {
      setTimer(newValueTimer())
      updtateTimer()
    } , 1000);
  }

//useEffect ( () => updtateTimer(), [])

  return timer
}

export default Timer