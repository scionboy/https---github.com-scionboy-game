let preNum = 1;     // 이전 랜덤숫자
let score = 0;  // 누적 점수

// 두더지 잡는 이벤트
const $img = document.querySelectorAll('img');
for (let $images of [...$img]) {
    $images.addEventListener('click', function () {
        touch();
        hideImg();
        console.log("점수는 ", gradeSum);
        printScore();
    })
}

// 점수 출력
function printScore() {
    const $score = document.querySelector('.score');
    $score.textContent = gradeSum;
}

function getTime() {
    const now = new Date();	// 현재 날짜 및 시간
    const sec = now.getSeconds();
    const milSec = now.getMilliseconds();
    const mil = milSec / 1000;
    const time = sec + mil;
    return time;
}

// 두더지 출력 이벤트
var ttime = 0;
function printImg() {
    let ranNum = Math.floor(Math.random() * 10);  // 랜덤 숫자 (0~9)
    if (ranNum === 0) { // 랜덤숫자가 0이면
        ranNum++;   // 0을 1로
    }
    const $item = document.querySelector('.item' + ranNum);
    ttime = getTime();

    console.log(getTime());
    $item.style.display = 'block';
    preNum = ranNum;

    setTimeout(() => {
        hideImg();
    }, 1000);
}

// 두더지 숨김 이벤트
function hideImg() {

    const $item = document.querySelector('.item' + preNum);
    $item.style.display = 'none';
}

// 게임 시작 이벤트
function startGame() {
    if (confirm('게임 시작?')) {
        inter_val();
        let interval = setInterval(() => {
            printImg();

            if(time==0){
                winCheck();
                clearInterval(interval);    // 반복 중단
                timer_stop();
            }
        }, 2000);
    }
}

document.getElementById('start').addEventListener('click', function () {
    startGame();
})

// ===========================================
function winCheck(){
    if(gradeSum>=300){
        alert("라운드 클리어!");
    }else{
        alert("타임아웃!");
    }
}


// upttime = 두더지가 올라온 시점의 현재시간
// gradeSum 누적 점수
// touchTime 내가 두더지를 눌렀을 때의 현재 시간

var upttime = 0;
var gradeSum = 0;

function touch() {

    // 내가 누를때 시간
    var d = new Date();

    touchSeconds = d.getSeconds();
    touchMilli = d.getMilliseconds();
    touchMil = touchMilli / 1000;
    touchTime = touchSeconds + touchMil; // 1000 밀리 = 1초 

    // 점수 체크하기, 내가 누른 시간 - 두더지 올라온 시간
    var check = touchTime - ttime;

    if (check > 0 && check <= 0.35) {
        gradeSum += 100;
        var grade = 100;
    } else if (check > 0.35 && check <= 0.7) {
        gradeSum += 70;
        var grade = 70;
    } else if (check > 0.7 && check <= 1) {
        gradeSum += 50;
        var grade = 50;
    } else {
        gradeSum += 0;
        var grade = 0;
    }

    return gradeSum;
}


var timerId;
// 60초 타이머
var time = 10;

// 1초마다 timout()을 실행함
function inter_val() {
    timerId = setInterval("timeout()", 1000);
}
// 1초씩 줄어드는 함수

function timeout() {
    // 화면에 타이머 출력
    time -= 1;
    document.querySelector(".timer").textContent = time;
    if (time == 0)
        timer_stop();
}

// 타이머 끝
function timer_stop() {
    clearInterval(timerId);

}