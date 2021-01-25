//Listen for auth status state change
//Callback function taking user as a parameter, now everytime there is a state change, i.E. login/logout this function will trigger
auth.onAuthStateChanged(user => {
  //if user has logged in object will exist  
  if (user) {
    //Get Event data from Firestore
    db.collection('Events').onSnapshot(snapshot => {
        //Pass data to functions
        setUpEvents(snapshot.docs);
        setUpUI(user);
    }, err => console.log(err.message));
  //Else will trigger if user is null, thus user logged out     
  } else {
    setUpUI();
    setUpEvents([]);
  }
})

//SignUp
const signUpForm = document.querySelector('#sign-up-form');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get user input
    const email = signUpForm['sign-up-email'].value;
    const password = signUpForm['sign-up-password'].value;

    //Sign up authentificaton 
    //Async function thus requires 'then' callback
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        return db.collection('Users').doc(cred.user.uid).set({
            emailAddress: signUpForm['sign-up-email'].value,
            firstName: signUpForm['sign-up-fName'].value,
            surname: signUpForm['sign-up-sName'].value
        });  
    }).then(() => {
        //Close Sign up modal
        const modal = document.querySelector('#modal-sign-up');
        M.Modal.getInstance(modal).close();
        signUpForm.reset();
    });
});

//Login
const login = document.querySelector('#login-form');
login.addEventListener('submit', (e) => {
    e.preventDefault();

    //User input
    const email = login['login-email'].value;
    const password = login['login-password'].value;

    //Sign in authentificaton 
    auth.signInWithEmailAndPassword(email,password).then(cred =>{
        //Close login modal
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        login.reset();
    });
});

//Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() =>{
    });
});

//Create Event
const createForm = document.querySelector('#create-event-form');
createForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    db.collection('Events').add({
        venueName: createForm['eName'].value,
        jobType: createForm['eType'].value,
        startDate: createForm['sDate'].value,
        startTime: createForm['sTime'].value,
        endDate: createForm['eDate'].value,
        endTime: createForm['eTime'].value,
        noOfStaff: createForm['noOfStaff'].value
    }).then(() => {
        const modal = document.querySelector('#modal-create-event');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch (err => {
        console.log(err.message);
    });
});

