const LOCATED_URL = new URL(window.location.href);
const PARAMS = LOCATED_URL.searchParams; //渡したパラメータを取得。今回は社員番号を取得。

let EMPLOYEE_FIND_COUNTER = 1; //非同期処理の回数カウンター
const MATCH_EMPLOYEE = setInterval(match_employee, 100); //非同期処理の設定と削除用変数
const SEARCH_PENCIL_ICON = setInterval(search_pencil_icon, 100);

async function match_employee() {
  /* 社員番号と該当するレコードを探索。非同期処理。 */
  try {
    const employeeData = document.getElementsByTagName("tbody")[0].rows; //全レコードを取得
    if (employeeData[0] === undefined) {
      throw new Error("loading error");
    }
    clearInterval(MATCH_EMPLOYEE); //非同期処理を削除
    /* 社員番号と該当したレコードのリンクに遷移 */
    for (let i = 0; i < employeeData.length; i++) {
      /* 社員番号が登録されていない場合、姓と名で探索 */
      if (PARAMS.get("employeeId") !== "") {
        if (
          employeeData[i]
            .getElementsByTagName("td")[1]
            .getElementsByTagName("div")[0].textContent ===
          PARAMS.get("employeeId")
        ) {
          const employeeLink = employeeData[i]
            .getElementsByTagName("td")[0]
            .getElementsByTagName("a")[0]
            .getElementsByTagName("i")[0];
          employeeLink.click();
        }
      } else {
        if (
          employeeData[i]
            .getElementsByTagName("td")[2]
            .getElementsByTagName("div")[0].textContent ===
            PARAMS.get("familyName") &&
          employeeData[i]
            .getElementsByTagName("td")[3]
            .getElementsByTagName("div")[0].textContent ===
            PARAMS.get("givenName") &&
          employeeData[i]
            .getElementsByTagName("td")[1]
            .getElementsByTagName("div")[0].textContent === ""
        ) {
          const employeeLink = employeeData[i]
            .getElementsByTagName("td")[0]
            .getElementsByTagName("a")[0]
            .getElementsByTagName("i")[0];
          employeeLink.click();
        }
      }
    }
    return;
  } catch (e) {}
  /* カウンターが一定回数を超えたら非同期処理を停止 */
  if (EMPLOYEE_FIND_COUNTER > 30) {
    clearInterval(MATCH_EMPLOYEE);
    alert("該当するデータがありません");
    window.close();
  }
}

async function search_pencil_icon() {
  /* 自動的にKVの連絡ボタンを押す非同期処理 */
  try {
    const pencilIcon = document.getElementsByClassName("ui icon pencil")[0];
    if (pencilIcon === undefined) {
      throw new Error("loading error");
    }
    clearInterval(SEARCH_PENCIL_ICON); //非同期処理を削除
    /* 青い連絡アイコンをクリック */
    pencilIcon.click();
    return;
  } catch (e) {
  } finally {
    EMPLOYEE_FIND_COUNTER++;
  }
  /* カウンターが一定回数を超えたら非同期処理を停止 */
  if (EMPLOYEE_FIND_COUNTER > 30) {
    clearInterval(SEARCH_PENCIL_ICON);
    alert("該当するデータがありません");
    window.close();
  }
}

document.getElementsByTagName("main")[0].style.display = "none"; // 遷移中のKVを不可視化するための処理
