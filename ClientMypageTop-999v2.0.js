let NAME_ID; //iframeにidを付与する非同期処理の設定と削除用変数
function TopMenu() {
  const editor = document.querySelector(".fluid.container");
  let div = document.createElement("div");
  div.id = "TopMenuBox";
  div.className = "TopMenuBox";
  //	let str = '<label for="hamChk" class="hamBox"><span></span></label>';

  let ico1 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65b8fd49429d76.910149522736/01nyusha-blue-yellowwhite-radiusV1.svg";
  let ico2 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65b8fd5abaa930.596713442736/02taishoku-blue-yellowwhite-radiusV1.svg";
  let ico3 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65b8fd6d5bfe42.743645082736/03shain-blue-yellowwhite-radiusV1.svg";
  let ico4 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65b8fd7ee69883.611564792736/04tetsuduki-blue-yellowwhite-radiusV1.svg";
  let ico5 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65b8fd9268f0a7.396219032736/05kyoyu-blue-yellowwhite-radiusV1.svg";
  let ico6 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65b8fda5294514.492925942736/06koubunsho-blue-yellowwhite-radiusV1.svg";
  let ico7 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65b8fdb7a0b9d7.526974682736/07cubic-blue-yellowwhite-radiusV1.svg";
  let ico8 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65b8fdce516497.889556172736/08user-blue-yellowwhite-radiusV1.svg";
  let ico9 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65b8fddf68ebd7.520425172736/09yuryo-gray-pink-radiusV1.svg";
  let ico10 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65b8fe00843482.352679372736/10401k-gray-pink-radiusV1.svg";

  str = '<section class="NKRTopMenu">';
  str += '<ul class="NKR-menu-button-list">';
  str += '<li id="nkr-menu-button1" class="NKR-menu-item">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link"><img src="' +
    ico1 +
    '" width="100%" height="100%"></a></div>';
  str += "</li>";
  str += '<li id="nkr-menu-button2" class="NKR-menu-item">';
  str +=
    '<div class="imgBox"><p><a class="nkr-svg-link" href="#"><img src="' +
    ico2 +
    '" width="100%" height="100%"></a></p></div>';
  str += "</li>";
  str += '<li id="nkr-menu-button3" class="NKR-menu-item">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="#"><img src="' +
    ico3 +
    '" width="100%" height="100%"></a></div>';
  str += "</li>";
  str += '<li id="nkr-menu-button4" class="NKR-menu-item">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="#"><img src="' +
    ico4 +
    '" width="100%" height="100%"></a></div>';
  str += "</li>";
  str += '<li id="nkr-menu-button5" class="NKR-menu-item">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="#"><img src="' +
    ico5 +
    '" width="100%" height="100%"></a></div>';
  str += "</li>";
  str += '<li id="nkr-menu-button6" class="NKR-menu-item">';
  str += '<div class="imgBox">';
  str +=
    '<a href="https://nkr-group.app.box.com/s/87lcwz7q8yqm57nmh9tovo694m4fbxnw/folder/117228850575" target="_blank">';
  str += '<img src="' + ico6 + '" width="100%" height="100%"></a></div>';
  str += "</li>";
  str += '<li id="nkr-menu-button7" class="NKR-menu-item">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="#"><img src="' +
    ico7 +
    '" width="100%" height="100%"></a></div>';
  str += "</li>";
  str += '<li id="nkr-menu-button8" class="NKR-menu-item">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="nkr-svg-link" href="https://5ea2a167.viewer.kintoneapp.com/public/8d7e0d531fd9f42781bd8a3b20636d9953e8f9aa1fb7356e4ee36259100ac3e2" target="_bank">';
  str += '<img src="' + ico8 + '" width="100%" height="100%"></a></div>';
  str += "</li>";
  str += '<li id="nkr-menu-button9" class="NKR-menu-item">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="#"><img src="' +
    ico9 +
    '" width="100%" height="100%"></a></div>';
  str += "</li>";
  str += '<li id="nkr-menu-button10" class="NKR-menu-item">';
  str += '<div class="imgBox">';
  str +=
    '<a href="https://5ea2a167.viewer.kintoneapp.com/public/nkrfsv2-6-kv-401ktop" target="_blank">';
  str += '<img src="' + ico10 + '" width="100%" height="100%"></a></div>';
  str += "</li></ul>";
  str += "</section>";

  div.innerHTML = str;
  //	editor.appendChild(div);
  editor.prepend(div);
}

function TopMenuMobile() {
  const editor = document.querySelector(".fluid.container");
  let div = document.createElement("div");
  div.id = "TopMenuBox";
  div.className = "TopMenuBox";
  //	let str = '<label for="hamChk" class="hamBox"><span></span></label>';

  let ico1 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65c89129253195.370815882736/01nyusha-smapho-grid.svg";
  let ico2 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65c8915b79aba9.438429852736/02taishoku-smapho-grid.svg";
  let ico3 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65cae71baf7923.652727452736/03shain-smapho-grid.svg";
  let ico4 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65c8917fa43264.909610422736/04tetsuduki-smapho-grid.svg";
  let ico5 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65c891918d89f3.722078822736/05kyoyu-smapho-grid.svg";
  let ico6 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65c8919f99f625.503961142736/06koubunsho-smapho-grid.svg";
  let ico7 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65c891ad34a109.874538102736/07cubic-smapho-grid.svg";
  let ico8 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65c891c050be02.391722312736/08user-smapho-grid.svg";
  let ico9 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65c891d090b361.922423512736/09yuryo-smapho-grid.svg";
  let ico10 =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65c891447a1435.555875322736/10401k-smapho-grid.svg";
  let nkrlogo =
    "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/65c891dc4c52f5.438530222736/logo-nkr240203.png";

  let str = '<section class="NKRMobileTopMenu">';

  str += '<div class="wrapper">';
  str += "<!-- ヘッダー -->";
  str += "<header>";
  str += "<h1>";
  str += '<img src="' + nkrlogo + '" alt="日本経営労務">';
  str += "</h1>";
  str += "</header>";
  str += "<!-- ヘッダー　ここまで -->";

  str += "<!-- ハンバーガーメニュー -->";
  str += "<nav><div>";
  str += '<input type="checkbox" id="hamburger-input-smp1">';
  str += '<label for="hamburger-input-smp1" class="hamburger-checkbox-smp1">';
  str += "<span></span>";
  str += "</label>";
  str += '<div class="hamburger-black-smp1"></div>';
  str += "</div></nav>";
  str += "<!-- ハンバーガーここまで -->";

  str += "<!-- スマホ用メニュー（隠れてる子）-->";
  str += '<nav><div class="nav-smp1">';
  str += '<ul class="nav-parent-smp1">';
  str += "<li>";
  str += '<label for="nav-acco-smp1">電子会議室　▼</label>';
  str +=
    '<input type="checkbox" id="nav-acco-smp1" class="nav-accordion-smp1">';
  str += '<ul class="nav-child-smp1">';
  str +=
    '<li><a href="https://5ea2a167.viewer.kintoneapp.com/public/08600f1b180aa96905e720f322a474b548882de67f2e4f5f3ada05205ce0610f" target="_blank">新規書込</a></li>';
  str +=
    '<li><a href="https://5ea2a167.viewer.kintoneapp.com/public/f97d11b4d69fd68e59ce57b4c1caaba7" target="_blank">会話履歴</a></li>';
  str += '<li><a href="#">返信待ち</a></li>';
  str += '<li><a href="#">回答待ち</a></li>';
  str += "</ul>";
  str += "</li>";
  str +=
    '<li><a href="https://5ea2a167.viewer.kintoneapp.com/public/573d3c53336ec2db5da666f24cb9c11b6181c76fef171f6eec936c97d357f729" target="_blank">給与計算カレンダー</a></li>';
  str +=
    '<li><a href="https://5ea2a167.viewer.kintoneapp.com/public/0830588e73d8bba9099a705d64b86c9e" target="_blank">助成金カレンダー</a></li>';
  str +=
    '<li><a href="https://5ea2a167.viewer.kintoneapp.com/public/000741024bf51725313b1425d6d9e84f6acd71ac2a5addb58699b1e414775209" target="_blank">NEWS</a></li>';
  str += '<li><a href="#">NKR担当者連絡先</a></li>';
  str += "</ul>";
  str += "</div>";
  str += "</nav>";
  str += "<!-- スマホ用メニュー　ここまで -->";

  str += '<ul class="grid-smp1">';
  str += '<li id="nkr-menu-button1" class="grid-icon-smp1">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="#"><img src="' +
    ico1 +
    '" width="100%" height="100%"></a>';
  str += "</div></li>";
  str += '<li id="nkr-menu-button2" class="grid-icon-smp1">';
  str +=
    '<div class="imgBox"><p><a class="nkr-svg-link" href="#"><img src="' +
    ico2 +
    '" width="100%" height="100%"></a></p>';
  str += "</div></li>";
  str += '<li id="nkr-menu-button3" class="grid-icon-smp1">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="#"><img src="' +
    ico3 +
    '" width="100%" height="100%"></a>';
  str += "</div></li>";
  str += '<li id="nkr-menu-button4" class="grid-icon-smp1">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="#"><img src="' +
    ico4 +
    '" width="100%" height="100%"></a>';
  str += "</div></li>";
  str += '<li id="nkr-menu-button5" class="grid-icon-smp1">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="#"><img src="' +
    ico5 +
    '" width="100%" height="100%"></a>';
  str += "</div></li>";
  str += '<li id="nkr-menu-button6" class="grid-icon-smp1">';
  str +=
    '<div class="imgBox"><a href="https://nkr-group.app.box.com/s/87lcwz7q8yqm57nmh9tovo694m4fbxnw/folder/117228850575" target="_blank">';
  str += '<img src="' + ico6 + '" width="100%" height="100%"></a>';
  str += "</div></li>";
  str += '<li id="nkr-menu-button7" class="grid-icon-smp1">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="#"><img src="' +
    ico7 +
    '" width="100%" height="100%"></a>';
  str += "</div></li>";
  str += '<li id="nkr-menu-button8" class="grid-icon-smp1">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="nkr-svg-link" href="https://5ea2a167.viewer.kintoneapp.com/public/8d7e0d531fd9f42781bd8a3b20636d9953e8f9aa1fb7356e4ee36259100ac3e2" target="_blank">';
  str += '<img src="' + ico8 + '" width="100%" height="100%"></a>';
  str += "</div></li>";
  str += '<li id="nkr-menu-button9" class="grid-icon-smp1">';
  str +=
    '<div class="imgBox"><a class="nkr-svg-link" href="#"><img src="' +
    ico9 +
    '" width="100%" height="100%"></a>';
  str += "</div></li>";
  str += '<li id="nkr-menu-button10" class="grid-icon-smp1">';
  str +=
    '<div class="imgBox"><a href="https://5ea2a167.viewer.kintoneapp.com/public/nkrfsv2-6-kv-401ktop" target="_blank">';
  str += '<img src="' + ico10 + '" width="100%" height="100%"></a>';
  str += "</div></li>";
  str += "</ul>";
  str += "</section>";

  str += "<!-- フッター -->";
  str += "<footer>";
  str += '<div id="nkr-footer"></div>';
  str += "</footer>";
  str += "<!-- フッターここまで -->";

  div.innerHTML = str;
  //	editor.appendChild(div);
  editor.prepend(div);
}

window.addEventListener("load", function () {
  if (IS_MOBILE) {
    TopMenuMobile();

    const hamburger = document.querySelector(".hamburger-checkbox-smp1");
    const nav = document.querySelector(".nav-smp1");

    hamburger.addEventListener("click", function () {
      nav.classList.toggle("toggle-smp1");
    });
  } else {
    TopMenu();
  }
  NAME_ID = setInterval(name_id, 100); //iframeにidを付与する非同期処理の設定と削除用変数
});
