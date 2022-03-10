const url = "https://stuff.nicolasvaillant.net/local/prive/istp/ressources/php/edt.php?iphone=true"

let xhttp = new Request(url)
xhttp.method = "get"
let res = await xhttp.loadJSON()

let currentDate = new Date()
let month,heure,min
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

    if(res[i] === undefined || res[i] === "undefined"){break}
    else{
        date_s = (res[i].start.split("T")[0]).replace(/['"]+/g, '')


        if(date === date_s){

            heure_s = (res[i].start.split("T")[1]).replace(/['"]+/g, '')

            if(heure < heure_s){
                return res[i].title
            }
        }
    }
}

Script.complete()
