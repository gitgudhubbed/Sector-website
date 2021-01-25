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

