console.log("load");

var $gallery = document.querySelector('#gallery'); //겔러리 불러내기

var $view = $gallery.querySelector(".view"); // 실제로 보이는 구멍
var $viewContainer = $view.querySelector(".view-container"); //겔러리 안에 뷰안에 있는 뷰 컨테이너 불러내기(무대라고 생각하기)
var $viewItem = $viewContainer.querySelectorAll(".view-item");////부 컨테이너 안에 들어갈 뷰 아이템들 (배우라고 생각하기)

var $list = $gallery.querySelector(".list"); //겔러리 안에 리스트를 불러내기
var $listItem = $list.querySelectorAll("li"); // 리스트 안에 있는 li요소들 불러내기
var _$a = [];

var $paddleNav = $gallery.querySelector(".paddle-nav"); // 갤러리 안에 패들니베게이션 불러내기
var $btnPaddleEl = $paddleNav.querySelectorAll("button");// 페달네비게이션 안에 버튼을 불러내기
var $btnPaddlePrev = $paddleNav.querySelector(".prev"); // 이전 버튼
var $btnPaddleNext = $paddleNav.querySelector(".next"); // 다음 버튼

for(var i = 0; i < $btnPaddleEl.length; i++){
    $btnPaddleEl[i].addEventListener("click", onClickPaddleEl); // 페달 네비게이션에 클릭 버튼을 발생시키기
}
function onClickPaddleEl(e){
    e.preventDefault();
    var $li = e.currentTarget.parentElement; //e.target: 이벤트가 일어난 곳   e.currentTarget: 실제로 이벤트가 걸려있는 위치  
    if($li.classList.contains('prev')){ //prev라는 클래스가 포함이 되있다면 (이미 클래스를 찾는 명령이기 때문에 .은 필요없다.)
        _cuId--;
        if(_cuId < 0) {
            _cuId = 0;   //더 이상 작동하지 않게 한계를 만드는 장치
        }
    }else if($li.classList.contains('next')){
        _cuId++;
        if(_cuId >=_max-1){
            _cuId = _max -1;  //더 이상 작동하지 않게 한계를 만드는 장치(길이가 지정될때는 0부터 세기 때문에 마지막 숫자는 1을 빼야함.)
        }
    }
    slide();
}


var _vWidth = window.innerWidth;  //창 안에 있는 넓이
var _vheight = window.innerHeight; //창 안에 있는 높이

var _max = $viewItem.length; //뷰 아이템의 길이
var _cuId = 0; // 작동되게하는 장치 일부
var _exId = _cuId; // 장동되게 하는 장치

window.addEventListener('resize',onResize);  //리사이즈를 한다. 화면의 크기를
function onResize(){
    _vWidth = window.innerWidth; //현재 창 안에 있는 넓이
    _vheight = window.innerHeight; //현재 창 안에 있는 높이
    $viewContainer.style.height = (_vheight * _max) + 'px'; // (무대)의 넓이는 현재 윈도우 안에 있는 창의 넓이 * (배우)들의 길이
    for(var i = 0; i < _max; i++){  //뷰 아이템의 길이만큼
        $viewItem[i].style.height = _vheight + 'px'; //번째 뷰 아이템(배우)는 현재 창의 크기만큼의 넓이다.
    }
    //리사이즈 할 때 view-container의 left 좌표 변경
    var top = _vheight * _cuId *-1;   //이건 뭔지 모르겠다.
    // $viewContainer.style.left = left + 'px;'
    TweenMax.killTweensOf($viewContainer);
    TweenMax.set($viewContainer, {css: {top: top}});
}
onResize();



for(var i = 0; i < _max; i++){
    var $a = $listItem[i].querySelector("a");
    _$a.push($a);
    $a.addEventListener("click", onClickListItemEl);
}
function onClickListItemEl(e) {
    e.preventDefault();
    var id = _$a.indexOf(e.currentTarget);
    var $listItemParent = e.currentTarget.parentElement;
    //현재 클릭된 요소(a) 의 부모 요소(li)를 찾는다.
    if(!$listItemParent.classList.contains('selected')){
        //부모 요소(li) 가 selected 라는 클래스를 포함하고 있는지 체크 - 조건에서는 포함하지 않을 때(false).
        _cuId = id;
        slide();
    }
}
$btnPaddlePrev.classList.add('disabled');
function slide(){

        if(_cuId === 0){
            $btnPaddlePrev.classList.add('disabled');
            $btnPaddleNext.classList.remove('disabled');
        }else if(_cuId == _max -1) {
            $btnPaddlePrev.classList.remove('disabled');
            $btnPaddleNext.classList.add('disabled');
        }else{
            $btnPaddlePrev.classList.remove('disabled');
            $btnPaddleNext.classList.remove('disabled');
    }

        //현재 클릭된 버튼의 번호를 변경.
        $listItem[_exId].classList.remove("selected");
        //이전에 활성화된 버튼의 클래스(selected)를 삭제
        $listItem[_cuId].classList.add("selected");
        //현재 버튼의 클래스(selected)가 활성화되도록 추가.
        var top = _vheight * _cuId * -1;

        
        //anime.
        /*
        anime({
            targets : $viewContainer,
            left : left,
            duration : 1000,
            easing : "easeInOutQuad"
        });
        */

        //TweenMax.
        //TweenMax.set();
        //애니메이션 없이 스타일을 변경.
        //TweenMax.set($viewContainer, { css: { left: left }});
        //TweenMax.to();
        //애니메이션을 설정.
        TweenMax.to($viewContainer, 1.0, { css: { top: top }, ease: Quad.easeInOut });


        //$viewContainer.style.left = left + 'px';



        _exId = _cuId;
        //다음 클릭시 눌렸던 번호를 유지하도록 값을 설정.
}

//------------------------------------------------------------------------------------character------------------------------------------------------------------------------------------------------------

