const firebaseConfig = {
  apiKey: "AIzaSyDisWR4Cw-6QnOvIqxDMInvy51d6vr8YxA",
  authDomain: "kwitter-11231.firebaseapp.com",
  databaseURL: "https://kwitter-11231-default-rtdb.firebaseio.com",
  projectId: "kwitter-11231",
  storageBucket: "kwitter-11231.appspot.com",
  messagingSenderId: "534228394317",
  appId: "1:534228394317:web:c4151c074316f0761cd704"
};
firebase.initializeApp(firebaseConfig);
userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");
function send() {
  msg = document.getElementById("msg").value
  firebase.database().ref(roomName).push({
    name: userName,
    message: msg,
    like: 0
  });
  document.getElementById("msg").value = ""
}
function getData() {
  firebase.database().ref("/" + roomName).on('value',
    function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val()
        if (childKey != "purpose") {
          firebaseMessageId = childKey;
          messageData = childData;
          console.log(messageData)
          console.log(firebaseMessageId)
          name = messageData["name"];
          message = messageData["message"]
          like = messageData["like"]
          nameWithTag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>"
          messageWithTag = " <h4 class='message_h4'>" + message + "</h4>";
          like_button = "<button class ='btn btn warning' id=" + firebaseMessageId + " value=" + like + " onclick=' updateLike(this.id)'>";
          spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
          row = nameWithTag + messageWithTag + like_button + spanWithTag;
          document.getElementById("output").innerHTML += row;
        }
      });
    });
}
getData();
function updateLike(messageId){
  console.log("likebuttonprecioned" + messageId)
  buttonId=messageId
  likes=document.getElementById(buttonId).value
  updateLikes=Number(likes) +1
    firebase.database().ref(roomName).child(messageId).update({
    like:updateLikes
  })
}


function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}

