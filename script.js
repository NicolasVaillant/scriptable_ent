//AJOUTEZ VOTRE MDP/USERNAME
const user = ""
const mdp = ""

const url = "https://stuff.nicolasvaillant.net/local/prive/istp/ressources/php/edt.php?iphone=true&TGQPQKJRYU=" + mdp + "&BJ64F8ALSX=" + user


let xhttp = new Request(url)
xhttp.method = "get"
let res = await xhttp.loadJSON()

let currentDate = new Date()
let month,heure,min,date_n
let mo = Number(currentDate.getMonth() + 1)

if(mo < 10){   
        month = "0" + mo
}


h = currentDate.getHours()     
min = currentDate.getMinutes()
if(h < 10){     
        h = "0" + h
}
if(min < 10){   
        min = "0" + min
}

heure = h + ":" + min + ":" + "00"

let date = currentDate.getFullYear() + "-" + month + "-" + currentDate.getDate()


for(let i = 0 ; i < 15 ; i++){ 

        if(res[i] === undefined || res[i] === "undefined"){continue}   
        else{
                date_s = (res[i].start.split("T")[0]).replace(/['"]+/g, '')


                if(date === date_s){   

                        heure_s = (res[i].start.split("T")[1]).replace(/['"]+/g, '')

                        if(heure < heure_s){
                                log(res[i].title)
                        }else{
                                return nextDay()
                        }
                }
        }
}

function nextDay(){
        for(let i = 0 ; i < 15 ; i++){ 

        if(res[i] === undefined || res[i] === "undefined"){continue}   
        else{
                date_n = currentDate.getFullYear() + "-" + month + "-" + Number(currentDate.getDate()+1)

                date_s = (res[i].start.split("T")[0]).replace(/['"]+/g, '')

                if(date_n === date_s){
                        log("(Demain) " + res[i].title)
                }
        }
}
}

Script.complete()
