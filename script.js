let targetCount=0
let currentCount=0

const namSelect=document.getElementById("namSelect")
const selectedName=document.getElementById("selectedName")
const currentCountText=document.getElementById("currentCount")
const sound=document.getElementById("mantraSound")

namSelect.addEventListener("change",()=>{

selectedName.innerText=namSelect.value

})

function setCount(val){

targetCount=val
currentCount=0
currentCountText.innerText=0

}

function customCount(){

let val=prompt("Enter custom count")

if(val && !isNaN(val)){

setCount(parseInt(val))

}

}

function increaseCount(){

if(targetCount===0){

alert("Select count first")
return

}

if(currentCount<targetCount){

currentCount++

currentCountText.innerText=currentCount

sound.currentTime=0
sound.play()

if(navigator.vibrate){

navigator.vibrate(50)

}

}

if(currentCount===targetCount){

saveHistory()
showPopup()

}

}

function saveHistory(){

let history=JSON.parse(localStorage.getItem("namHistory"))||[]

history.push({

name:selectedName.innerText,
count:targetCount,
date:new Date().toLocaleString()

})

localStorage.setItem("namHistory",JSON.stringify(history))

loadHistory()

}

function loadHistory(){

let history=JSON.parse(localStorage.getItem("namHistory"))||[]

let historyDiv=document.getElementById("history")

historyDiv.innerHTML=""

history.slice().reverse().forEach(item=>{

let div=document.createElement("div")

div.className="history-item"

div.innerText=`${item.name} - ${item.count} times (${item.date})`

historyDiv.appendChild(div)

})

}

function clearHistory(){

localStorage.removeItem("namHistory")

loadHistory()

}

function showPopup(){

document.getElementById("popup").style.display="block"

document.getElementById("completeText").innerText=
selectedName.innerText+" Completed 🙏"

}

function closePopup(){

document.getElementById("popup").style.display="none"

}

loadHistory()

if("serviceWorker" in navigator){

navigator.serviceWorker.register("service-worker.js")

}