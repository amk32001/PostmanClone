const firebaseConfig = {
  //   copy your firebase config informations
   apiKey: "AIzaSyAaLi4KJXtIzsByf4xqiLoaJZUfm4EZO1g",
  authDomain: "api-testing-d1d40.firebaseapp.com",
  databaseURL: "https://api-testing-d1d40-default-rtdb.firebaseio.com",
  projectId: "api-testing-d1d40",
  storageBucket: "api-testing-d1d40.appspot.com",
  messagingSenderId: "51941287904",
  appId: "1:51941287904:web:0054acb52204984715ad85",
  measurementId: "G-RE7G8WQYHV"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");
  var url=getElementVal("url")

  saveMessages(name, emailid,url, msgContent);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, url,msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    url:url,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};


document.getElementById('file').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref('images/' + file.name);

    storageRef.put(file).on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        const progressBar = document.getElementById('progress_bar');
        progressBar.value = progress;
    });

    
});