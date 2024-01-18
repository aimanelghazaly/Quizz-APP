let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");




function getQuestion(){
    
    let myRequest= new XMLHttpRequest();
    myRequest.onreadystatechange=function(){
        if(this.readyState=== 4 && this.status===200){
        
            let questionObject=JSON.parse(this.responseText);
            let questionCount= questionObject.length;
            createBullets(questionCount);
            // Add Quesion Data
            addQuestionData(questionObject[0],questionCount)
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
function addQuestionData(obj,count){
   // create h2 
   let questionTitle=document.createElement("h2");
   // Create Question Text
   let questionText=docoment.createTextNode(obj['title']);



}

