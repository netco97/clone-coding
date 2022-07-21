const body = document.querySelector("body");

// 이미지 갯수
const IMG_NUMBER=3;

// 랜덤 숫자 생성
function GetRandom(){
    return Math.floor(Math.random()* IMG_NUMBER);
}

// 랜덤 이미지 출력
function paintImage(imgNumber) {
    const img = new Image();
    img.src = `img/${imgNumber}.jpeg`;
    img.classList.add("bgImg");
    body.prepend(img);
}

// 랜덤 수 생성해서, 랜덤 이미지 출력하기
function init() {
    const randomNumber = GetRandom();
    paintImage(randomNumber);
}

init();