const timer = document.getElementById("timer")
const ref = document.getElementById("ref")
let sec = 0
let min = 5
let retenu
let refs = JSON.parse(localStorage.getItem("refs")) || []

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
        if(sec == 0 && min == 0){
            choseRef()
        }

        timer.textContent = `${min}:${retenu+sec}`
    },1000)    
}


document.addEventListener("click", (e) => {
    if(e.srcElement.id == "back"){backRef()}
    if(e.srcElement.id == "next"){choseRef()}
    if(e.srcElement.id == "play"){
        if(timeCycle == undefined){startInterval()}
        else{clearInterval(timeCycle);timeCycle=undefined}
    }
})

let iRef = parseInt(localStorage.getItem("iRef")) || 1
function choseRef(){

    fetch(`https://api.pexels.com/v1/search?query=pose solo&page=${iRef}&per_page=${1}`, {
    headers: {
        Authorization: "zkCzVHlxPOU2SDa6izRUOfdgKZEzNOni9M81a41WYPmsrQMt6ZgFdqEH"
    }
    })
    .then(res => res.json())
    .then(data => {
        ref.src = data.photos[0].src.large
        if(refs[iRef-1] == undefined){
            refs.push({url:data.photos[0].src.large,i:iRef})
            localStorage.setItem("refs", JSON.stringify(refs));
        }
        sec = 0
        min = 5
        timer.textContent = `5:00`
        iRef++
        localStorage.setItem("iRef", iRef)
        clearInterval(timeCycle)
        startInterval()
    });        
    console.log("new");
    
}

function backRef(){
    if(iRef>2){
        console.log("new2");
        iRef--
        localStorage.setItem("iRef", iRef)
        ref.src = refs[iRef-2].url
        sec = 0
        min = 5
        timer.textContent = `5:00`
        clearInterval(timeCycle)
        startInterval()        
    }

}

choseRef()
