const CLIENT_ID = 'XXX';
const API_KEY = 'XXX';
const ISPT_ID = "XXX"

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

const SCOPES = "https://www.googleapis.com/auth/calendar";

const authorizeButton = document.getElementById('authorize_button');
const signoutButton = document.getElementById('signout_button');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';

        get_value()

    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function listCalendar(){
    gapi.client.calendar.calendarList.list().then(
        function(response){
            const events = response.result.items;
            // console.log(events.length)
            if (events.length > 0) {
                for (let i = 0; i < 1; i++) {
                    console.log(events)
                }
            }
        })
}

function listUpcomingEvents(e) {

    gapi.client.calendar.events.list({
        'calendarId': ISPT_ID,
        'timeMin': e.start.dateTime,
        'showDeleted': true,
        'singleEvents': true,
        'maxResults': 10,
        'q' : e.description,
        'orderBy': 'startTime'
    }).then(function(response) {
        const events = response.result.items;
        if (events.length > 0) {
            for (let i = 0; i < 1; i++) {
                const event = events[i];
                let when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }

                if(event.status !== "confirmed"){
                    print(event.summary, event.id, event.status, true)
                }else{
                    print(event.summary, event.id, event.status, false)
                }
                setCard(event.summary, event.id, event.status)
                // updateElement(e, event)
            }
        } else {
            console.log("NO EVENT CREATED")
            try{
                const request = gapi.client.calendar.events.insert({
                    'calendarId': ISPT_ID,
                    'resource': e
                });
                request.execute(function(event) {
                    console.log("Created : " + event.htmlLink)
                });
            }catch (error){
                console.log(error)
            }
        }
    });
}

function print(title, id, status, important){
    const css__t = "color: green; font-size: 12px"
    const css__i = "color: #60609e; font-size: 12px"
    const css__s = "color: #c81b1b; font-size: 12px"
    let text
    if(important){
        text = `%c${title}\n` + `%cid : ${id}\n` + `⚡ %cStatus : ${status}`
    }else{
        text = `%c${title}\n` + `%cid : ${id}\n` + `%cStatus : ${status}`
    }
    console.log(text, css__t, css__i, css__s);
}

function updateElement(e, ev){
    var event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2015-05-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'dateTime': '2015-05-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
            ]
        }
    };
    console.log("o")
    gapi.client.calendar.events.list({
        'calendarId': ISPT_ID,
        'timeMin': e.start.dateTime,
        'showDeleted': true,
        'singleEvents': true,
        'maxResults': 1,
        'orderBy': 'startTime'
    }).then(function(response) {
        const events = response.result.items;
        if (events.length > 0) {
            console.log(ev.id)
            const request = gapi.client.calendar.events.update({
                'calendarId': ISPT_ID,
                'eventId' : ev.id,
                'resource': event
            })

            request.execute(function(event) {
                console.log("Created : " + event.htmlLink)
            });
        }
    });
}
