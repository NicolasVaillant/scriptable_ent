
const n = new Notification()

let textVar = args.plainTexts.toString()

n.title = ""
n.subtitle = textVar.split(",")[0]
n.body = textVar.split(",")[1]

n.threadIdentifier = "Notifications"
n.schedule()
Script.complete()