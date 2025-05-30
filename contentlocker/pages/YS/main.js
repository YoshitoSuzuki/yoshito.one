var timeSc = document.getElementById("time");

var now = new Date();
var Year = now.getFullYear();
var Month = now.getMonth()+1;
var Date = now.getDate();
var Hour = now.getHours();
var Min = now.getMinutes();

timeSc.innerHTML ="生きています。(" + Year + "年" + Month + "月" + Date + "日" + Hour + ":" + Min + "現在)";


//-------------------------------------------------------------------------
function PageTopAnime() {
		      var scroll = $(window).scrollTop();
		        if (scroll >= 200){//上から200pxスクロールしたら
              $('#page-top').removeClass('RightMove');//#page-topについているRightMoveというクラス名を除く
			        $('#page-top').addClass('LeftMove');//#page-topについているLeftMoveというクラス名を付与
		        }else{
			           if(
				             $('#page-top').hasClass('LeftMove')){//すでに#page-topにLeftMoveというクラス名がついていたら
				             $('#page-top').removeClass('LeftMove');//LeftMoveというクラス名を除き
				             $('#page-top').addClass('RightMove');//RightMoveというクラス名を#page-topに付与
                   }
               }
             }

             // 画面をスクロールをしたら動かしたい場合の記述
             $(window).scroll(function () {
               PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
             });

             // ページが読み込まれたらすぐに動かしたい場合の記述
             $(window).on('load', function () {
               PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
             });


             // #page-topをクリックした際の設定
             $('#page-top').click(function () {
               $('body,html').animate({
                 scrollTop: 0//ページトップまでスクロール
               }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
               return false;//リンク自体の無効化
             });
      $(".openbtn").click(function () {//ボタンがクリックされたら
	       $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
         $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
       });

       $("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
         $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
         $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
       });

//----------------------------------------------------------------

$('#page-link a[href*="#"]').click(function () {
	var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
	var pos = $(elmHash).offset().top;	//idの上部の距離を取得
	$('body,html').animate({scrollTop: pos}, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
	return false;
});
