const timer = document.getElementById("timer")
let sec = 0
let min = 5
let retenu

let timeCycle = undefined
function startInterval(){
    timeCycle = setInterval(() => {
        sec--    
        if(sec == -1){
            min--
            sec = 59
        }
        if(sec < 10){
            retenu = "0"
        }else{
            retenu = ""
        }

        timer.textContent = `${min}:${retenu+sec}`
    },1000)    
}


document.addEventListener("click", (e) => {
    if(e.srcElement.id == "back"){}
    if(e.srcElement.id == "next"){}
    if(e.srcElement.id == "play"){
        if(timeCycle == undefined){startInterval()}
        else{clearInterval(timeCycle);timeCycle=undefined}
    }
})