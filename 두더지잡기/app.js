let preNum = 1;     // 이전 랜덤숫자
let hideSec = 1500; // 두더지 나왔다가 들어갈때까지의 시간
let showSec = 2200; // 두더지 들어갔다가 나올때까지의 시간
let round = 1;  // 라운드 누적 변수
let num = 17;    // img의 class를 증가시킬 변수
var rowlevel = 4;

let startGameInterval;
let $holes;
let $td;

const $round = document.getElementById('round');
$round.textContent = round + '라운드';


let wingrade = 10; // 다음라운드 점수

let round_test = 4;

// gradeSum : 누적 점수
// ttime = 두더지 올라온 시점의 현재 시간
var gradeSum = 0;
var ttime = 0;

// 타이머 설정
var timerId; // 타이머 끄는 변수
var time = 0; // 타이머 몇초로 할지

const $map = document.querySelector('.map');
$map.addEventListener('click', function (e) {
    if (!e.target.matches('.map img')) return;
    touch();
    hideImg();
    printScore();
});

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
function printImg(hideSecP) {
    let ranNum = Math.floor(Math.random() * (round_test * round_test));  // 랜덤 숫자 (0~9)
    if (ranNum === 0) { // 랜덤숫자가 0이면
        ranNum++;   // 0을 1로
    }
    const $item = document.querySelector('.item' + ranNum);
    ttime = getTime();

    $item.style.display = 'block';
    preNum = ranNum;

    setTimeout(() => {
        hideImg();
    }, hideSecP);
}

// 두더지 숨김 이벤트
function hideImg() {
    const $item = document.querySelector('.item' + preNum);
    $item.style.display = 'none';
}

// 게임 시작 함수
function startGame(hideSecP, showSecP) {
    $round.textContent = round + '라운드';

    if (confirm('게임 시작?')) {
        console.log(time);
        gradeSum = 0;
        time = 10;
        inter_val();
        startGameInterval = setInterval(() => {
            console.log('호출');
            printImg(hideSecP);
            if (time == 0 || gradeSum >= wingrade) {
                stopGame();
                winCheck();
            }
            // 게임 종료 이벤트
            document.getElementById('stop').onclick =  function () {
                if (confirm('게임을 종료하시겠습니까?')) {
                    clearInterval(startGameInterval);    // 반복 중단
                    alert('게임 종료!!');
                    stopGame();
                    initRound();
                }
            };
        }, showSecP);
    }
}

function stopGame() {
    timer_stop();
    hideImg();
    time = 0;
    document.querySelector(".timer").textContent = time;
}
function initRound(){
    gradeSum = 0;   // 점수 초기화
    hideSec = 1500; // 두더지 나왔다가 들어갈때까지의 시간 
    showSec = 2200; // 두더지 들어갔다가 나올때까지의 시간
    if(round==2){
        $map.deleteRow(-1);
    }else if(round==3){
        $map.deleteRow(-1);
        $map.deleteRow(-1);
    }
    
    for (let $hole of $holes) {
        $hole.style.height = '50px';
    }
    for (let $cells of $td) {
        $cells.style.height = "150px";
    }
    round=1;    // 라운드 초기화
    $round.textContent = round + '라운드';

}

// 게임 시작 이벤트
document.getElementById('start').addEventListener('click', function () {
    startGame(hideSec, showSec);    // 2000, 3000
})

// 다음 라운드 함수
function nextRound() {
    console.log(time);
    round++;
    const $map = document.querySelector('.map');// 테이블

    const newRow = $map.insertRow();    // 행 추가
    for (let i = 0; i < rowlevel; i++) {
        // const firstRow = $map.rows[i];
        // const x = firstRow.insertCell(i);
        // x.innerHTML='<img src="img/두더지.jpg" alt="두더지" class="item' + num + '"><div class="hole"></div>';
        const newCell = newRow.insertCell(i);
        newCell.innerHTML = '<img src="img/두더지.jpg" alt="두더지" class="item' + num + '"><div class="hole"></div>';
        num++;
    }

    $holes = document.querySelectorAll('.hole');  // 구멍
    $td = document.querySelectorAll('td');   // td
    if (round == 2) {   // 2라운드 일때
        hideSec = 800;
        showSec = 1300;
        for (let $hole of $holes) {
            $hole.style.height = '45px';
        }
        for (let $cells of $td) {
            $cells.style.height = "130px";
        }
    } else if (round == 3) {    // 3라운드 일때
        hideSec = 500;
        showSec = 1000;
        for (let $hole of $holes) {
            $hole.style.height = '40px';
        }
        for (let $cells of $td) {
            $cells.style.height = "110px";
        }
    }
    startGame(hideSec, showSec);
}

// ===========================================
function winCheck() {
    if (gradeSum >= 20) {
        alert("라운드 클리어!");
        clearInterval(startGameInterval);    // 반복 중단

        if (round == 3) {
            alert('마지막 라운드까지 클리어하셨습니다. 축하드립니다!!!');
            stopGame();
            initRound();
        } else {
            if (confirm("다음라운드 가시겠습니까")) {
                gradeSum = 0;
                // round_test++;
                printScore();
                // rowlevel++;
                nextRound();  // 새 행, 시간 단축
            } else {
                stopGame();
                initRound();
            }
        }
    } else {
        alert("타임아웃! 클리어 실패 ㅠㅠㅠ");
        clearInterval(startGameInterval);    // 반복 중단
        stopGame();
        initRound();
    }
}

function touch() {
    // 내가 누를때 시간
    var d = new Date();

    touchSeconds = d.getSeconds();
    touchMilli = d.getMilliseconds();
    touchMil = touchMilli / 1000;
    // touchTime 내가 두더지를 눌렀을 때의 현재 시간
    touchTime = touchSeconds + touchMil; // 1000 밀리 = 1초 

    // 점수 체크하기, 내가 누른 시간 - 두더지 올라온 시간
    var check = touchTime - ttime;

    if (check > 0 && check <= 0.35) {
        gradeSum += 100;
    } else if (check > 0.35 && check <= 0.7) {
        gradeSum += 70;
    } else if (check > 0.7 && check <= 1) {
        gradeSum += 50;
    } else {
        gradeSum += 0;
    }
}

// 1초마다 timout()을 실행함
function inter_val() {
    timerId = setInterval('timeout()', 1000);
}

// 1초씩 줄어드는 함수
function timeout() {
    // 화면에 타이머 출력
    time -= 1;
    document.querySelector(".timer").textContent = time;
    if (time == 0 || gradeSum >= wingrade)
        timer_stop();
}

// 타이머 끝
function timer_stop() {
    clearInterval(timerId);
}