///getting all require element
const welcome = document.querySelector(".welcome");
const enter_btn = welcome.querySelector(".welcome .enter");
const start_box = document.querySelector(".start_btn");
const start_btn = start_box.querySelector("button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const option_list = document.querySelector(".option_list");

const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector(".time_line");
const timeoff = quiz_box.querySelector(".time_text");

//if enter button clicked
enter_btn.onclick = ()=>{
    window.input_value = document.querySelector("input").value; //window.input_value is used to make variable global
    //validation for entering name
    if(window.input_value!=""){
        start_box.classList.add("activeStart");
        welcome.classList.add("removeEnter");
    }
    else{
        alert("Enter Your Name please!");
    }
    
}
//if Start quiz button Clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

//if Exit button Clicked

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");//hide the info
}

//if Continue button Clicked

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");//hide the info
    showQuestions(0); //calling show Questions Function
    questionCounter(1);//passing 1 parameter to questionCounter;
    startTimer(15);//Calling startTimer Function
    startTimerLine(0);// calling startTimerLIne function
}

let ques_count = 0;
let counter;
let timeValue = 15;
let widthValue =0;
let userScore = 0;
let counterLine;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    ques_count = 0;
    timeValue = 15;
    widthValue =0;
    userScore = 0;
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz"); // show quizz box;
    showQuestions(ques_count);
    questionCounter(ques_count+1, questions.length);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display= "none";
    timeoff.textContent = "Time Left";
}
// if quit quizz button is clicked
quit_quiz.onclick = ()=>{
    window.location.reload();
}

//if next button clicked 

next_btn.onclick = ()=>{
    if(ques_count < questions.length - 1){
        ques_count++;
        showQuestions(ques_count);
        questionCounter(ques_count+1, questions.length);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display= "none";
        timeoff.textContent = "TimeLeft";
    }
    else{
            clearInterval(counter);
            clearInterval(counterLine);
            showResultBox();
        
    }
    
}

//getting questions and option from array
function showQuestions(index){
    const ques_text = document.querySelector(".que_text");
    let ques_tag = '<span>'+ questions[index].numb + "." + questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>' 
    + '<div class="option">'+ questions[index].options[1] +'<span></span></div>' 
    + '<div class="option">'+ questions[index].options[2] +'<span></span></div>' 
    + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    ques_text.innerHTML = ques_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    //set onclick attribute to all available options
    for(let i=0; i< option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class=" fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class=" fas fa-times"></i></div>';

// if user clicked on option
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);

    let userAns = answer.textContent;
    let correctAns = questions[ques_count].answer;
    let allOption = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend" , tickIcon);
    }
    else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend" , crossIcon);

        //if answers is incorrect then automatically selected the corret answer

        for(let i = 0; i < allOption; i++){
            if(option_list.children[i].textContent  == correctAns){// if there is an option which is matched to an array answer;
                option_list.children[i].setAttribute("class","option correct");// adding correct class to the correct option
                option_list.children[i].insertAdjacentHTML("beforeend" , tickIcon);// adding tick option to the text;
            }
        }
    }

    //once user selected disable all options
    for(let i = 0; i < allOption; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
    timeoff.textContent = "TimeLeft";
}

//function for showing result
function showResultBox(){
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.remove("activeQuiz"); //remove the quiz box
    result_box.classList.add("activeResult"); // show result Box
    const scoreText = result_box.querySelector(".score_text");
    const nameText= result_box.querySelector(".complete_text");
    let nameTag = window.input_value + ' You have completed the Quiz!</div>';
    nameText.innerHTML = nameTag;
    if(userScore>=8){
        let scoreTag = '<span>and Congratulation, You got  <p>'+ userScore +'</p> Out of <p>' + questions.length + '</p> Its really appriciated.</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore<8 && userScore >4){
        let scoreTag = '<span>and Its quit good, You got only  <p>' + userScore + '</p> Out of <p>' + questions.length + '</p> It can be improved</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore <= 4){
        let scoreTag = '<span> and Sorry You got only <p>' + userScore + '</p>Out of<p>' + questions.length + '</p>.You need hard work to pass it.</span>';
        scoreText.innerHTML = scoreTag;
    }
}



function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeoff.textContent = "TimeOff";

            let correctAns = questions[ques_count].answer;
            let allOption = option_list.children.length;

            for(let i = 0; i < allOption; i++){
                if(option_list.children[i].textContent  == correctAns){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend" , tickIcon);
                }
            }
            for(let i = 0; i < allOption; i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
            timeoff.textContent = "TimeLeft";
        }
    }
}


//function for timer line;
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time +'px';
        if(time > 549){
            clearInterval(counterLine);
            timeCount.textContent = "00";
        }
    }
}

function questionCounter(count){
    const bottom_ques_counter = document.querySelector(".total_ques");
    let ques_counter_tag = '<span><p>'+ count +'</p>of<p>' + questions.length + '</p>Question</span>';
    bottom_ques_counter.innerHTML = ques_counter_tag;
}


