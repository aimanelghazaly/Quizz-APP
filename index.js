let countSpan = document.querySelector(".count span");
let bullets=document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(" .quiz-area");
let submitButton=document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results")



// Set option
let currentIndex=0;
let right_answer=0;

function getQuestion(){
    
    let myRequest= new XMLHttpRequest();
    myRequest.onreadystatechange=function(){
        if(this.readyState=== 4 && this.status===200){
        
            let questionObject=JSON.parse(this.responseText);
            let questionCount= questionObject.length;
            createBullets(questionCount);
            // Add Quesion Data
            addQuestionData(questionObject[currentIndex],questionCount)
            // click on Submit
            submitButton.onclick=()=>{
                // Get Right Answer
                let theRightAnswer = questionObject[currentIndex].right_answer
                //increase index
                currentIndex ++;
            // check the answer
            checkAnswer(theRightAnswer,questionCount);
            // remove previous Question
            quizArea.innerHTML = "";
            answersArea.innerHTML = "";
            addQuestionData(questionObject[currentIndex],questionCount)
            // handle bullets Class
            handleBullets();
            // show Resuls
            showResults(questionCount);
                 
            }
        }
    };
    myRequest.open("Get","html question.json",true);
    myRequest.send(); 

}
 
getQuestion();
function createBullets(num){
    countSpan.innerHTML=num;
    for(let i=0; i<num; i++){
        let theBullet=document.createElement("span");

        if( i === 0){
            theBullet.className= "on";

        }
        // append bullets to Main bullet Container
        bulletsSpanContainer.appendChild(theBullet);
    } 
    
}
function addQuestionData(obj, count) {
    if(currentIndex < count){
    // create h2
    let questionTitle = document.createElement("h2");
    // Create Question Text
    let questionText = document.createTextNode(obj['title']);
    questionTitle.appendChild(questionText);

    // Continue avec le reste de votre fonction...
   
    quizArea.appendChild(questionTitle);
    // create the answers
    for(let i=1;i<=4; i++) {
        //create Main answer Div
        let mainDiv=document.createElement("div");
     // add Class to Main Div
        mainDiv.className ='answer';
     // Create Radio Input
     let radioInput=document.createElement("input");
     radioInput.name='question' ;
     radioInput.type='radio';
     radioInput.id = `answer_${i}`;
     radioInput.dataset.answer = obj[`answer_${i}`];
     if(i === 1){
        radioInput.checked=true; 
     }

    //create Label
    let thelabel=document.createElement("label");
    thelabel.htmlFor = obj[`answer_${i}`];
    let theLabelText=document.createTextNode(obj[`answer_${i}`]);
    // add the text to label
    thelabel.appendChild(theLabelText);
    // ADD input+ label to main Div
    mainDiv.appendChild(radioInput);
    mainDiv.appendChild(thelabel);

    answersArea.appendChild(mainDiv);

    }
}
}
function checkAnswer(rAnswer,count){
    let answers = document.getElementsByName("question");
    let theChoosenAnswer;
    for(let i=0;i<answers.length;i++){
        if(answers[i].checked){
            theChoosenAnswer = answers[i].dataset.answer;
        }
    }
    
    if(rAnswer === theChoosenAnswer){
        right_answer++;
        console.log("Good Answer");
        
    }

}    

function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    if(currentIndex < bulletsSpans.length){
    bulletsSpans.forEach((span, index) => {
        bulletsSpans[currentIndex].classList.add("on");
    });
}

} 
function showResults(count){
    let theResults;
 if(currentIndex===count){
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if(right_answer>(count/2) && right_answer<
count){
    theResults=`<span class="good">Good</span>,${right_answer}from ${count} Is Good`;
} else if(right_answer===count){
    theResults=`<span class="perfect">Perfect</span>,All Answers Is Good`;
}
else {
    theResults=`<span class="Bad">Bad</span>,${right_answer}from ${count} Is Bad`;
}

resultsContainer.innerHTML=theResults;
}
   
 }
 










