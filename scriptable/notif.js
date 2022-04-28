const n = new Notification()

// Passing Arguments here
let textVar = args.plainTexts.toString()
let args_0 = textVar.split(",")[0]
let args_1 = textVar.split(",")[1]

n.subtitle = ""

if(args_1 === null || args_1 === undefined || args_1 === ""){   
        n.title = textVar
        n.body = "Aucun résultat"
}else{ 
        n.title = args_0
        n.body = args_1
}

n.threadIdentifier = "Emploi du temps"

ENT_url = "https://ent.istp-france.com/ENT/Eleve/MonPlanning.aspx";

n.openURL = ENT_url

// Add action when the notification is held : haptic touch (Apple)
n.addAction("Ouvrir l'ENT", ENT_url, false)

n.schedule()
Script.complete()
