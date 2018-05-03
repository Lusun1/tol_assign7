
// Initialize Firebase
var config = {
      apiKey: "AIzaSyB8R3MovR91MjVinPgW_8AM16LLbyXgCK4",
      authDomain: "tolassignment7.firebaseapp.com",
      databaseURL: "https://tolassignment7.firebaseio.com",
      projectId: "tolassignment7",
      storageBucket: "tolassignment7.appspot.com",
      messagingSenderId: "692529149032"
    };
firebase.initializeApp(config);

var database = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
database.settings(settings);

var askQuestion = "";
var askReason = "";
    
// get length of question collection, may use this later
var size_question ;
database.collection("questions").get().then(function(querySnapshot) {
        size_question = querySnapshot.size;
        console.log(size_question);
    });


//done
function submitQuestion() {
      var yoyo = document.getElementById("submit_question");
      yoyo.disabled = true;
      yoyo.innerHTML="Submitted!";
    
      
      askQuestion = document.getElementById("ask-question").value;
      askReason = document.getElementById("ask-self-reason").value;
      database.collection("questions").add({
        content: askQuestion,
        reason: askReason
      });
    }


var questionarray = new Array();
var reasonarray = new Array();
var answerarray = new Array();
var temp;
var num = 0;

//view one random question
function getQuestion() 
    {
            
      questionarray = [];
      reasonarray = [];
      // get data here
      database.collection("questions")
        .get()
        .then(function (querySnapshot) {
          size_question = querySnapshot.size;
          num = size_question -1;
          querySnapshot.forEach(function (doc) 
            {
              if (doc.data().content != document.getElementById("ask-question").value)
              questionarray.push
              ({
                    content:   doc.data().content,
                    reason:   doc.data().reason
              });
              
            });
          console.log(questionarray[0])
          })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
      console.log(questionarray);
      console.log(questionarray.length);
       var t = setTimeout("temp = questionarray[Math.floor((Math.random() * (questionarray.length - 1)))].content",1000);
      // var s = setTimeout("console.log(temp)",1100);
//      var l = setTimeout("num = questionarray.length-1",800);
        
      //if no timeout before this you cannot do anything
//      var t = setTimeout("temp = questionarray[num].content",300);
      var s = setTimeout("console.log(num)",310);
      //temp = questionarray[Math.floor((Math.random() * (questionarray.length - 1)))];
      var textobj=document.getElementById("box_show_question");  
      temp = "Resistive touchscreens facilitate more accurate input";
      textobj.innerHTML=temp; 
    }



//Show button of peer answer button 
function SubmitAnswer()
    {  
        answerarray = [];
        console.log(document.getElementById("answer-reason").value);
        
        database.collection("answers").where("question", "==", document.getElementById("box_show_question").innerHTML)
        .get()
        .then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) 
        {
             
            if (doc.data().reason != document.getElementById("answer-reason").value)
            {
                answerarray.push
                ({
                    answer:   doc.data().answer,
                    reason:   doc.data().reason
                });
            }
             else{
                 console.log(doc.data().reason+"   "+document.getElementById("answer-reason").value);
             }
             

        });
            console.log("see if I got it:"+answerarray[0].reason)
            
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
        //Get answer div
        var appendto = document.getElementById("answer");
        //Create a button for view peer answers
        var btn_peeranswer = document.createElement("button");
        var change = document.getElementById("sbm_answer");
        change.innerHTML="Submitted!";
        change.disabled = true;
          
        btn_peeranswer.className = "btn btn-dark"; 
        btn_peeranswer.id = "view_peeranswers"
        btn_peeranswer.innerHTML = "View Peer's Answers";
    
        appendto.appendChild(btn_peeranswer);
        console.log(appendto); 
        //Show peer answers onclick
        btn_peeranswer.onclick = function()
            {
                var yoyo = document.getElementById("view_peeranswers");
                yoyo.disabled = true;
                console.log(answerarray.length);
                var tbl = document.createElement("table");
                tbl.setAttribute("class", "tbll");
                var tblBody = document.createElement("tbody");     
                var header = tbl.createTHead();
                var row = header.insertRow(0);
                var header1 = row.insertCell(0);  
                header1.innerHTML = "Answer";
                var header2 = row.insertCell(1);
                header2.innerHTML = "Reason";
                // Generate answer table        
                for (var i=0;i<answerarray.length;i++)
                    {
                          var row = document.createElement("tr");
                          var cell1 = document.createElement("td");
                          var cellText1 = document.createTextNode(answerarray[i].answer);
                          var cell2 = document.createElement("td");
                          var cellText2 = document.createTextNode(answerarray[i].reason);
                          cell1.appendChild(cellText1);
                          cell2.appendChild(cellText2);
                          row.appendChild(cell1);
                          row.appendChild(cell2);

                        tblBody.appendChild(row);
                    }
                  //Append table to html
                  tbl.appendChild(tblBody); 
                  appendto.appendChild(tbl);
            }
        
      var answerReason = document.getElementById("answer-reason").value;
      var question_ct = document.getElementById("box_show_question").innerHTML;
      var YrN = document.querySelector('input[name = "options"]:checked').value;
      console.log(YrN);
      database.collection("answers").add({
        question: question_ct,
        answer:YrN,
        reason: answerReason
      });
    }



function peerAnswer(){
     var yoyo = document.getElementById("clk_eval");
     yoyo.disabled = true;
   
      console.log(answerarray[0]);
      var answer_tmp = answerarray[0].answer;
      var reason_tmp = answerarray[0].reason;
      var reasonobj=document.getElementById('evaluate-answer');  
      reasonobj.innerHTML="Answer: "+answer_tmp+"  Reason:"+reason_tmp; 
    }

function submitEvaluation(){
    var yoyo = document.getElementById("eval");
    yoyo.disabled = true;
    
}