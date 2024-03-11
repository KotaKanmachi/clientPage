let EMPLOYEES_LIST = []; //従業員データを保持するオブジェクト配列
let EXTRACT_COUNTER = 1; //非同期処理の回数カウンター
let ADD_HEADER_INFO; //ヘッダーに会社情報を記載する非同期処理の削除用変数
let GET_LIST; //従業員名簿取得の非同期処理の削除用変数
let DOWNLOAD_PULLDOWN; //プルダウンメニューダウンロードの非同期処理の削除用変数
let CHANGE_CALENDAR; //給与計算・助成金カレンダーの非同期処理の削除用変数
let ADD_CALENDAR_BUTTON; //カレンダー切り替えボタンの非同期処理の設定と削除用変数
const HEADER_COMPANY_INFOMATION_CLASSNAME = "nkr-header-company-information";
const CALENDAR_BUTTON_CLASSNAME = "nkr-calendar-button";

function make_dialog_retire() {
  /* 退社連絡用のダイアログクラスを呼び出す関数 */
  const transitionURL =
    "https://5ea2a167.viewer.kintoneapp.com/public/nkrfsv2-6-kv-retire-1637-109";
  const parent_target = document.getElementById("nkr-menu-button2");
  const d = new Dialog_clientPage("退社連絡", parent_target, transitionURL);
  d.update(d.assemble());
  d.add_dialog();
}

function make_pulldown(menuList, buttonNum, pulldownId) {
  /* プルダウンdomの作成。引数はメニューの文字列、URL、従業員選択ビットのオブジェクト配列、セクション番号、id */
  const parent_target = document.getElementById("nkr-menu-button" + buttonNum);
  const bounds = parent_target.getBoundingClientRect();
  if (bounds.bottom < 0) {
    location.reload(); // ページをリロード
  }
  const p = new Pulldown_clientPage(pulldownId, parent_target, menuList);
  p.update(p.assemble());
  return;
}

function removeSectionDom(id) {
  const pulldownListIframe = document.getElementById(id);
  let pulldownListSection = pulldownListIframe;
  while (pulldownListSection.tagName !== "SECTION") {
    if (pulldownListSection.parentElement) {
      pulldownListSection = pulldownListSection.parentElement;
    } else {
      pulldownListIframe.remove();
      console.log("section tag could not found");
      return;
    }
  }
  pulldownListSection.remove();
}

/* 半角カタカナを全角ひらがなに変換 */
const HALF_KATA = [
  'ｧ','ｱ','ｨ','ｲ','ｩ','ｳ','ｪ','ｴ','ｫ','ｵ',
  'ｶ','ｶﾞ','ｷ','ｷﾞ','ｸ','ｸﾞ','ｹ','ｹﾞ','ｺ','ｺﾞ',
  'ｻ','ｻﾞ','ｼ','ｼﾞ','ｽ','ｽﾞ','ｾ','ｾﾞ','ｿ','ｿﾞ',
  'ﾀ','ﾀﾞ','ﾁ','ﾁﾞ','ｯ','ﾂ','ﾂﾞ','ﾃ','ﾃﾞ','ﾄ','ﾄﾞ',
  'ﾅ','ﾆ','ﾇ','ﾈ','ﾉ',
  'ﾊ','ﾊﾞ','ﾊﾟ','ﾋ','ﾋﾞ','ﾋﾟ','ﾌ','ﾌﾞ','ﾌﾟ','ﾍ','ﾍﾞ','ﾍﾟ','ﾎ','ﾎﾞ','ﾎﾟ',
  'ﾏ','ﾐ','ﾑ','ﾒ','ﾓ',
  'ｬ','ﾔ','ｭ','ﾕ','ｮ','ﾖ',
  'ﾗ','ﾘ','ﾙ','ﾚ','ﾛ',
  'ヮ','ﾜ','ヰ','ヱ','ｦ','ﾝ','ｳﾞ','ヵ','ヶ','ﾜﾞ','ｲﾞ','ｴﾞ','ｦﾞ'
]

const halfKataToWide = (text) => {
  const firstCharCode = 12353;
  return text
    .replace(/[ﾜｲｴｦ]ﾞ/g, (m) => "ヷヸヹヺ".charAt("ﾜﾞｲﾞｴﾞｦﾞ".indexOf(m) / 2))
    .replace(/([ｦ-ｯｱｲｴｵﾅ-ﾉﾏ-ﾝ]|[ｳｶ-ﾄ]ﾞ?|[ﾊ-ﾎ][ﾞﾟ]?)/g, (m) =>
      String.fromCharCode(HALF_KATA.indexOf(m) + firstCharCode)
    )
    .replace(/[ﾞﾟｰ｡｢｣､･]/g, (m) =>
      "゛゜ー。「」、・".charAt("ﾞﾟｰ｡｢｣､･".indexOf(m))
    );
};

const toHira = (text) =>
  halfKataToWide(text).replace(/[ァ-ヶ]/g, (m) =>
    String.fromCharCode(m.charCodeAt(0) - 0x60)
  );

async function name_id() {
  /* ダッシュボードビュー内のiframeにidを付与する。付与するidはiframe内のhtmlのtitleタグの中身。非同期処理。 */
  try {
    const iframe_list = document.getElementsByTagName("IFRAME");
    if (iframe_list.length === 0) {
      throw new Error("client page could not be loaded");
    }
    /* iframe内のhtmlのtitleを取得してidを付与 */
    for (let i = 0; i < iframe_list.length; i++) {
      const innerDoc = iframe_list[i].contentDocument;
      const title = innerDoc.title;
      if (title === "" || title === "Public View" || title === "Loading...") {
        throw new Error("title could not be loaded");
      }
      iframe_list[i].id = title;
    }
    clearInterval(NAME_ID); //非同期処理を削除
    EXTRACT_COUNTER = 1; //カウンターリセット
    ADD_HEADER_INFO = setInterval(add_header_info, 100); //非同期処理を開始
    GET_LIST = setInterval(get_list, 100); //非同期処理を開始
    CHANGE_CALENDAR = setInterval(change_calendar, 100); //非同期処理を開始
    return;
  } catch (e) {
  } finally {
    EXTRACT_COUNTER++;
  }
  if (EXTRACT_COUNTER > 20) {
    clearInterval(NAME_ID);
    location.reload(); // ページをリロード
  }
}

async function add_header_info() {
  /* 会社情報、ログイン者情報をヘッダーに付与。非同期処理。*/
  try {
    const companyInfoIframe = document.getElementById("プルダウン管理");
    const values =
      companyInfoIframe.contentWindow.document.getElementsByTagName("tbody")[0]
        .children[0].children;
    if (values === undefined) {
      throw new Error("company infomation page could not be loaded");
    }
    let textInfo;
    if (IS_MOBILE) {
      textInfo =
        values[2].textContent +
        "　　" +
        values[3].textContent +
        "　様\r<" +
        values[4].textContent +
        ">";
    } else {
      textInfo =
        values[2].textContent +
        "　　" +
        values[3].textContent +
        "　様　<" +
        values[4].textContent +
        ">";
    }
    const companyNum = values[1].textContent;
    DOWNLOAD_PULLDOWN = setInterval(() => {
      download_pulldownMenu(companyNum); // 会社番号
    }, 100); //非同期処理を開始
    const wrappedHeaderText = document.createElement("div");
    wrappedHeaderText.textContent = textInfo;
    wrappedHeaderText.className = HEADER_COMPANY_INFOMATION_CLASSNAME;
    if (IS_MOBILE) {
      document.getElementById("nkr-footer").appendChild(wrappedCompanyInfoText);
    } else {
      document
        .getElementsByClassName("ui large inverted pointing menu")[0]
        .appendChild(wrappedHeaderText);
    }
    removeSectionDom("プルダウン管理"); // sectionごと削除
    clearInterval(ADD_HEADER_INFO); //非同期処理を削除
    return;
  } catch (e) {
  } finally {
    EXTRACT_COUNTER++;
  }
  /* カウンターが一定回数を超えたら非同期処理を停止 */
  if (EXTRACT_COUNTER > 30) {
    clearInterval(ADD_HEADER_INFO);
    console.log("error: header information could not get");
    removeSectionDom("プルダウン管理"); // sectionごと削除
  }
}

async function get_list() {
  /* 社員名簿から全社員情報を取得する。非同期処理。*/
  try {
    const employeePage =
      document.getElementById("社員名簿＆各種連絡").contentWindow; //社員名簿のiframeを取得
    const employeeData =
      employeePage.document.getElementsByTagName("tbody")[0].rows; //社員名簿の全レコードを取得
    if (employeePage === undefined || employeeData.length === 0) {
      throw new Error("employees page could not be loaded");
    }
    /* 取得したレコードをオブジェクトとして配列にスタック */
    for (let j = 0; j < employeeData.length; j++) {
      /* 社員番号、姓、名、ｾｲ、ﾒｲを取得 */
      EMPLOYEES_LIST.push({
        employeeNumber: employeeData[j]
          .getElementsByTagName("td")[0]
          .getElementsByTagName("div")[0].textContent,
        familyName: employeeData[j]
          .getElementsByTagName("td")[1]
          .getElementsByTagName("div")[0].textContent,
        givenName: employeeData[j]
          .getElementsByTagName("td")[2]
          .getElementsByTagName("div")[0].textContent,
        familyNameReading: toHira(
          employeeData[j]
            .getElementsByTagName("td")[3]
            .getElementsByTagName("div")[0].textContent
        ),
        givenNameReading: toHira(
          employeeData[j]
            .getElementsByTagName("td")[4]
            .getElementsByTagName("div")[0].textContent
        ),
      });
    }
    make_dialog_retire(); //退職連絡にダイアログを付与
    removeSectionDom("社員名簿＆各種連絡"); // sectionごと削除
    clearInterval(GET_LIST); //非同期処理を削除
    return;
  } catch (e) {
  } finally {
    EXTRACT_COUNTER++;
  }
  /* カウンターが一定回数を超えたら非同期処理を停止 */
  if (EXTRACT_COUNTER > 30) {
    clearInterval(GET_LIST);
    console.log("error: employee list could not get.");
    removeSectionDom("社員名簿＆各種連絡"); // sectionごと削除
  }
}

async function download_pulldownMenu(companyNumber) {
  /* プルダウンメニューをiframeから取得する。会社番号を引数に渡す。*/
  try {
    const pulldownListIframe =
      document.getElementById("NKRFSV2.6_プルダウンメニュー管理");
    const pulldownListDom =
      pulldownListIframe.contentWindow.document.getElementsByTagName("tbody")[0]
        .childNodes;
    if (pulldownListDom[0] == undefined) {
      throw new Error("loading error");
    }

    const isCompanyMatch = Array.prototype.some.call(
      pulldownListDom,
      (elem) => {
        if (elem.childNodes[3].textContent == companyNumber) {
          const targetPulldownList = elem.childNodes;
          for (let i = 1; i < 11; i++) {
            const originalMenuList = targetPulldownList[i + 3]
              .getElementsByTagName("tbody")[0]
              .getElementsByTagName("tr");
            const originalMenuListName =
              targetPulldownList[i + 3].getElementsByTagName("label");
            if (
              originalMenuList[0].childNodes[0].textContent == "" &&
              originalMenuList.length == 1
            ) {
              continue;
            }

            let menuProperties = {
              項目名: null,
              表示選択: null,
              URL: null,
              従業員選択: null,
              有料選択: null,
            };
            for (let j = 0; j < originalMenuListName.length; j++) {
              let propertyName = originalMenuListName[j].textContent;
              if (menuProperties.hasOwnProperty(propertyName)) {
                menuProperties[propertyName] = j;
              }
            }
            const menuList = [];
            Array.prototype.forEach.call(originalMenuList, (elem) => {
              let menu = {};
              menu["menuName"] =
                elem.childNodes[menuProperties["項目名"]].textContent;
              menu["url"] = elem.childNodes[menuProperties["URL"]].textContent;
              const selectBoolean =
                elem.childNodes[menuProperties["従業員選択"]].textContent ===
                "選択する"
                  ? true
                  : false;
              menu["employeeSelect"] = selectBoolean;
              const displayBoolean =
                elem.childNodes[menuProperties["表示選択"]].textContent ===
                "表示"
                  ? true
                  : false;
              menu["displaySelect"] = displayBoolean;
              // 有料選択機能は未実装のため省略
              menuList.push(menu);
            });
            make_pulldown(menuList, i, "menu" + i);
          }
          return true;
        }
        return false;
      }
    );
    if (!isCompanyMatch) {
      throw new Error("company number is not registered");
    }
    removeSectionDom("NKRFSV2.6_プルダウンメニュー管理"); // sectionごと削除
    clearInterval(DOWNLOAD_PULLDOWN); //非同期処理を削除
  } catch (e) {
  } finally {
    EXTRACT_COUNTER++;
  }
  /* カウンターが一定回数を超えたら非同期処理を停止 */
  if (EXTRACT_COUNTER > 30) {
    clearInterval(DOWNLOAD_PULLDOWN);
    console.log("error: pulldown menu couldn't be downloaded.");
    removeSectionDom("NKRFSV2.6_プルダウンメニュー管理"); // sectionごと削除
  }
}

async function change_calendar() {
  /* カレンダーを所定の位置に配置する非同期処理。 */
  try {
    const KIframe = document.getElementById("給与計算カレンダー");
    const JIframe = document.getElementById("助成金カレンダー");
    const calendarSpace = document.getElementById("NKRFSV2.6_カレンダースペース"); //開発用。変更必要
    const calendarSpaceParent = calendarSpace.parentNode;
    let KSection = KIframe;
    let JSection = JIframe;
    while (!KSection.matches("section")) {
      KSection = KSection.parentNode;
    }
    while (!JSection.matches("section")) {
      JSection = JSection.parentNode;
    }
    if (
      KIframe === undefined ||
      JIframe === undefined ||
      calendarSpace === undefined
    ) {
      throw new Error("calendar could not be loaded");
    }
    ADD_CALENDAR_BUTTON = setInterval(add_calendar_butotn, 100); //非同期処理を設定
    EXTRACT_COUNTER = 1;
    calendarSpace.remove(); //もともとあるKVを削除
    calendarSpaceParent.appendChild(KIframe);
    calendarSpaceParent.appendChild(JIframe);
    KSection.remove();
    JSection.remove();
    clearInterval(CHANGE_CALENDAR); //非同期処理を削除
    return;
  } catch (e) {
  } finally {
    EXTRACT_COUNTER++;
  }
  /* カウンターが一定回数を超えたら非同期処理を停止 */
  if (EXTRACT_COUNTER > 30) {
    clearInterval(CHANGE_CALENDAR);
    console.log("error: calendar could not merge");
    removeSectionDom("給与計算カレンダー"); // sectionごと削除
    removeSectionDom("助成金カレンダー"); // sectionごと削除
  }
}

async function add_calendar_butotn() {
  /* 配置したカレンダーにボタンを付与する非同期処理。 */
  try {
    const KIframe = document.getElementById("給与計算カレンダー");
    const JIframe = document.getElementById("助成金カレンダー");
    const KButtonSpace =
      KIframe.contentWindow.document.getElementsByClassName("popupspace")[0];
    const JButtonSpace =
      JIframe.contentWindow.document.getElementsByClassName("popupspace")[0];
    if (
      KIframe === undefined ||
      JIframe === undefined ||
      KButtonSpace === undefined ||
      JButtonSpace === undefined
    ) {
      throw new Error("calendar could not be loaded");
    }
    const JcalendarButton = document.createElement("button");
    JcalendarButton.textContent = "給与計算カレンダーに変更";
    JcalendarButton.onclick = function () {
      KIframe.style.display = "block";
      JIframe.style.display = "none";
    };
    JcalendarButton.className = CALENDAR_BUTTON_CLASSNAME;
    const KcalendarButton = document.createElement("button");
    KcalendarButton.textContent = "助成金カレンダーに変更";
    KcalendarButton.onclick = function () {
      JIframe.style.display = "block";
      KIframe.style.display = "none";
    };
    KcalendarButton.className = CALENDAR_BUTTON_CLASSNAME;
    KButtonSpace.appendChild(KcalendarButton);
    JButtonSpace.appendChild(JcalendarButton);
    KIframe.style.display = "block";
    JIframe.style.display = "none";
    clearInterval(ADD_CALENDAR_BUTTON); //非同期処理を削除
    return;
  } catch (e) {
  } finally {
    EXTRACT_COUNTER++;
  }
  /* カウンターが一定回数を超えたら非同期処理を停止 */
  if (EXTRACT_COUNTER > 30) {
    clearInterval(ADD_CALENDAR_BUTTON);
    console.log("error: calendar button could not place.");
  }
}
