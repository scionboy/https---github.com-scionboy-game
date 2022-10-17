// =============== 박도준 작업 >> 두더지 올라오는거 ===============
let preNum = 1;     // 이전 랜덤숫자

function getTime() {
    const now = new Date();	// 현재 날짜 및 시간
    const sec = now.getSeconds();
    const milSec = now.getMilliseconds();
    const mil = milSec / 1000;
    const time = sec + mil;
    return time;
}
function printImg() {
    let ranNum = Math.floor(Math.random() * 10);  // 랜덤 숫자 (0~9)
    if (ranNum === 0) { // 랜덤숫자가 0이면
        ranNum++;   // 0을 1로
    }
    const $item = document.querySelector('.item' + ranNum);
    $item.style.display = 'block';
    preNum = ranNum;
    
    setTimeout(() => {
        hideImg();
    }, 2000);
}

function hideImg() {
    console.log(getTime());
    const $item = document.querySelector('.item' + preNum);
    $item.style.display = 'none';
}

(function () {
    setInterval(() => {
        printImg();
    }, 3000);
})();

// ===========================================

// upttime = 두더지가 올라온 시점의 현재시간
// gradeSum 누적 점수
// touchTime 내가 두더지를 눌렀을 때의 현재 시간

var upttime = 0;
var gradeSum = 0;
function test() {

    // 두더지가 올라왔을때 초
    var u = new Date();

    upSeconds = u.getSeconds();

    upMilli = u.getMilliseconds();

    upMil = upMilli / 1000;

    // 두더지
    upttime = upSeconds + upMil;

}

document.getElementById("btn").addEventListener("click", touch);

// test
document.getElementById("btn2").addEventListener("click", test);

// test2
document.getElementById("btn3").addEventListener("click", test2);


// 타이머 테스트
document.getElementById("time").addEventListener("click", inter_val);

function test2() {
    var a = new Date();

    alert(a.getSeconds() / 10);
}

function touch() {

    // 내가 누를때 시간
    var d = new Date();

    touchSeconds = d.getSeconds();
    touchMilli = d.getMilliseconds();
    touchMil = touchMilli / 1000;
    touchTime = touchSeconds + touchMil; // 1000 밀리 = 1초 

    // 점수 체크하기, 내가 누른 시간 - 두더지 올라온 시간
    var check = touchTime - upttime;

    if (check > 0 && check <= 0.7) {
        gradeSum += 100;
        var grade = 100;
    } else if (check > 0.7 && check <= 1.4) {
        gradeSum += 70;
        var grade = 70;
    } else if (check > 1.4 && check <= 2) {
        gradeSum += 50;
        var grade = 50;
    } else {
        gradeSum += 0;
        var grade = 0;
    }

    alert("누른시간 : " + touchTime + " 두더지 올라온 시간 : " + upttime + " 획득 점수 : " + grade);
}


var timerId;
// 60초 타이머
var time = 4;
// 1초마다 timout()을 실행함
function inter_val() {


    timerId = setInterval("timeout()", 1000);

}
// 1초씩 줄어드는 함수
function timeout() {

    // 화면에 타이머 출력
    time -= 1;
    document.querySelector(".dd").textContent = time;
    if (time == 0)
        timer_stop();
}

// 타이머 끝
function timer_stop() {
    alert("게임 끝");
    alert("당신의 점수는 : "+gradeSum);
    clearInterval(timerId);



    // if(gradeSum>점수){
    //     if(confirm("다음 레벨로 진행하시겠습니까?")){
    //         gradeSum=0;
    //         time=60;



    //     }else{
    //         alert("게임 종료");

    //     }
    // }


}
