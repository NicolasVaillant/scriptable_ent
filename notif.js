const n = new Notification()

// Passing Arguments here
let textVar = args.plainTexts.toString()

n.title = "Emploi du temps 📚"
n.subtitle = ""

// Avoid error for passed args
if(textVar === null || textVar === undefined || textVar === ""){       
        n.body = "Aucun résultat"
}else{ 
        n.body = textVar.split(",")[1]
}

n.threadIdentifier = "Emploi du temps"

ENT_url = "https://ent.istp-france.com/ENT/Eleve/MonPlanning.aspx";

n.openURL = ENT_url

// Add action when the notification is held : haptic touch (Apple)
n.addAction("Ouvrir l'ENT", ENT_url, false)

n.schedule()
Script.complete()
