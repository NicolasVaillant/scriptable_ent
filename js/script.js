const container = document.querySelector('.container')

function get_value(){
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const result = JSON.parse(this.responseText);
            setCalendarEventISTP(result)
        }
    };
    xmlhttp.open("GET", "https://stuff.nicolasvaillant.net/local/prive/istp/ressources/php/edt.php", true);
    xmlhttp.send();
}

// regex
function removeChar(str) {
    return str.replace(/^.|.$/g, "");
}

function setCalendarEventISTP(result){
    const e = result[0]
    const size = result[1]
    let event, start, end
    
    for (let i = 0; i < size.taille - 1; i++) {
        if(e[i].title !== ""){
            let startSplit = e[i].start.split('}];')[0]
            let endSplit = e[i].end.split('}];')[0]
            let professorSplit = e[i].teacher.split(', ')[0]
            start = new Date(removeChar(startSplit)).toISOString()
            end = new Date(removeChar(endSplit)).toISOString()
            event = {
                'summary': 'Cours : ' + e[i].title,
                'description': 'Cours ISTP.\nEnseignant : ' + professorSplit,
                'start': {
                    'dateTime': start,
                    'timeZone': 'Europe/Paris'
                },
                'end': {
                    'dateTime': end,
                    'timeZone': 'Europe/Paris'
                }
            }
            listUpcomingEvents(event)
        }
    }
}

function setCard(title, id, status){
    const card = document.createElement('div')
    card.classList.add('card')
    const title__label = document.createElement('p')
    const id__label = document.createElement('p')
    const status__label = document.createElement('p')
    title__label.innerText = "Cours : " + title
    id__label.innerText = "ID : " + id
    status__label.innerText = "Status : " + status

    card.appendChild(title__label)
    card.appendChild(id__label)
    card.appendChild(status__label)
    container.appendChild(card)
}
