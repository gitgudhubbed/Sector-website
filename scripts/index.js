const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
//const loggedInDropDownLinks = document.querySelectorAll('.dropdown-content logged-in');
const eventList = document.querySelector('.events');
const accountDetails = document.querySelector('.account-details');
//var that = this;
const userEventList = document.querySelector('.user-event-list');
const userEvents = document.querySelector('.user-events');
//const eventApply = document.querySelector('.event-apply');



const setUpUI = (user) => {
    if (user){
        //Account info
        db.collection('Users').doc(user.uid).get().then(doc => {
            const html = `
            <div> Logged in as ${user.email}</div>
            <div>${doc.data().firstName}</div>
            <div>${doc.data().surname}</div>
            `;
            accountDetails.innerHTML = html;
        })
        
        //Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block'); 
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        //hide account info
        accountDetails.innerHTML = ''
        loggedInLinks.forEach(item => item.style.display = 'none'); 
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

//Setup Events
//Take data array
const setUpEvents = (data) => {
    if(data.length){
        let html = '';
        //Cycle through array
        data.forEach(doc => {
            //Get data contained within each item
            const event = doc.data();
            //Template string 
            const li = `
                <li>
                    <div class = "collapsible-header grey lighten-4">${event.venueName}</div>
                    <div class = "collapsible-body white"> JOB TYPE:  ${event.jobType} </div>
                    <div class = "collapsible-body white"> START DATE: ${event.startDate} </div>
                    <div class = "collapsible-body white"> START TIME: ${event.startTime} </div>
                    <div class = "collapsible-body white"> END DATE: ${event.endDate} </div>
                    <div class = "collapsible-body white"> END TIME: ${event.endTime} </div>
                    <div class = "collapsible-body white"> NUMBER OF STAFF: ${event.noOfStaff} <div class ="event-apply"><button class="waves-effect waves-light btn-small " style="float-right;" type="submit" id="event-apply">Apply</button></div> </div>
                </li>
            `;
            
            //set html to equal template
            html += li;
        });
        //appened each item to list
        eventList.innerHTML = html;

        data.find(doc => {
        //const event = doc.data();
        const eventApply = document.querySelectorAll('.event-apply');
            eventApply.forEach(btn => btn.addEventListener('click', function(){
                console.log(`you applied to ${doc.id}`);
            }));
        });
    } else {
        eventList.innerHTML = '<h5 class= "center-align">Login to view events</h5>';
    }
}

//Setup User Events
function getUserEvents() {
     const uid = firebase.auth().currentUser.uid;
     //const uid = 'kFX82pBNm1hyljVNHBhDZPULJjN2';
     const getUserEventsFunction = firebase.functions().httpsCallable('getEvents_v1');
    getUserEventsFunction({uid:uid}).then(function(result){
        
         console.log(result);
         let html = '';
         result.data.forEach(doc => {
            if (doc != null){
            //const event = result.data();
            //Template string 
            const li = `
                <li>
                    <div class = "collapsible-header grey lighten-4">${doc.venueName}</div>
                    <div class = "collapsible-body white"> JOB TYPE:  ${doc.jobType} </div>
                    <div class = "collapsible-body white"> START DATE: ${doc.startDate} </div>
                    <div class = "collapsible-body white"> START TIME: ${doc.startTime} </div>
                    <div class = "collapsible-body white"> END DATE: ${doc.endDate} </div>
                    <div class = "collapsible-body white"> END TIME: ${doc.endTime} </div>
                    <div class = "collapsible-body white"> NUMBER OF STAFF: ${doc.noOfStaff} </div>
                </li>
            `;
            html += li;
        }else{
            html = html;
        }
    })
        //appened each item to list
        userEvents.innerHTML = html;
     });
     
};
userEventList.addEventListener('click', function(){
     console.log('Your events');
     getUserEvents();
});


//Setup matererlize components
//Listener for when content is loaded to page
document.addEventListener('DOMContentLoaded', function(){

    //Collects all tags with class of modal
    var modals = document.querySelectorAll('.modal');
    //Initilisation from materialise library 
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    //init for select menu
    var dropDownElems = document.querySelectorAll('select');
    M.FormSelect.init(dropDownElems);
    
    //Init for DatePicker
    var dateElems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dateElems);

    //Init for TimePicker
    var timeElems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(timeElems);
});
