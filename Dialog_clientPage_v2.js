const EMPLOYEES_SEARCHBAR_CLASSNAME = "nkr-employees-searchBar";
const EMPLOYEES_SUGGESTIONS_LIST_CLASSNAME = "nkr-employees-suggestions-list";
const DIALOGBUTTON_CANCEL_CLASSNAME = "nkr-dialog-CancelButton";
const DIALOG_TITLE_CLASSNAME = "nkr-dialog-title";
const DIALOG_HEADER_CLASSNAME = "nkr-dialog-header";
const DIALOG_APPEARS_CLASSNAME = "nkr-dialog-appears";
const EMPLOYEES_SUGGESTIONS_NAME_CLASSNAME = "nkr-employees-suggestions-name";
const EMPLOYEES_SUGGESTIONS_NUMBER_CLASSNAME =
  "nkr-employees-suggestions-number";
let IS_MOBILE = false;
let IS_TABLET = false;

(function() {
  // 表示端末の判定
  const ua = navigator.userAgent;
  if (
    ua.indexOf("iPhone") > 0 ||
    ua.indexOf("iPod") > 0 ||
    (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)
  ) {
    IS_MOBILE = true;
  } else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
    IS_TABLET = true;
  }
})();

class Dialog_clientPage extends Dialog {
  transition_URL;

  constructor(id, parentTarget, transitionURL) {
    super(id, parentTarget);
    this.transition_URL = transitionURL;
  }
  assemble() {
    /*parent_targetにappendするdomの組み立て。*/
    const dialog = this.make_dialog();
    const form = this.make_form();
    this.prevent_enter(form);
    const wrapped_form = this.wrap_form(form);
    const dialog_title = this.make_dialog_title();
    const cancel_button = this.make_cancel_button(dialog);
    const dialog_header = this.make_dialog_header();
    dialog_header.appendChild(dialog_title);
    dialog_header.appendChild(cancel_button);
    dialog.appendChild(dialog_header);
    dialog.appendChild(wrapped_form);

    const wrapped_searchBar = this.make_searchBar(dialog);
    form.appendChild(wrapped_searchBar);

    const wrapped_dialog = this.wrap_dialog(dialog);
    this.dialog_disappears(dialog);
    const ua = navigator.userAgent;
    if (IS_MOBILE) {
      dialog.style.height = "100%";
    } else if (IS_TABLET) {
      dialog.style.height = "70%";
    } else {
      dialog.style.height = "70%";
    }
    dialog.style.margin = "auto";
    return wrapped_dialog;
  }
  make_searchBar(modalDialog) {
    /*検索バーを作成。*/
    const searchSpace = document.createElement("div");
    const searchBarSpace = document.createElement("div");
    searchBarSpace.className = EMPLOYEES_SEARCHBAR_CLASSNAME;
    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.id = "search-bar";
    searchBar.placeholder = "従業員名または社員番号を入力してください";
    searchBar.size = "35";
    searchBarSpace.appendChild(searchBar);
    let suggestionsList = document.createElement("ul");
    suggestionsList.className = EMPLOYEES_SUGGESTIONS_LIST_CLASSNAME;
    suggestionsList = this.display_suggestion(
      searchBar,
      suggestionsList,
      modalDialog
    );
    searchSpace.appendChild(searchBarSpace);
    searchSpace.appendChild(suggestionsList);
    return searchSpace;
  }
  prevent_enter(form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    return;
  }
  display_suggestion(searchBar, suggestionsList, modalDialog) {
    /*検索候補を提案する機能。候補欄から選択することでイベントを発生*/
    const transitionURL = this.transition_URL;

    const createEmployeeListItem = (employee) => {
      const listItem = document.createElement("li");
      const nameDiv = document.createElement("div");
      const numberDiv = document.createElement("div");
      nameDiv.className = EMPLOYEES_SUGGESTIONS_NAME_CLASSNAME;
      numberDiv.className = EMPLOYEES_SUGGESTIONS_NUMBER_CLASSNAME;
      nameDiv.innerHTML = `${employee.familyName}　${employee.givenName}`;
      numberDiv.innerHTML = `#${employee.employeeNumber}`;
      listItem.appendChild(nameDiv);
      listItem.appendChild(numberDiv);
      /*選択した従業員の社員番号、姓、名を社員名簿のurlのパラメータに渡す*/
      listItem.addEventListener("click", () => {
        this.dialog_close(modalDialog);
        /* 新たなタブでページを表示しパラメーターを受け渡す */
        const newWindow = window.open("about:blank");
        if (newWindow) {
          newWindow.location.href = `${transitionURL}?employeeId=${employee.employeeNumber}&familyName=${employee.familyName}&givenName=${employee.givenName}`;
        }
      });
      return listItem;
    };

    const clearAndDisplaySuggestions = (employeeList) => {
      //検索候補欄をクリア
      suggestionsList.innerHTML = "";
      employeeList.forEach((employee) => {
        const listItem = createEmployeeListItem(employee);
        suggestionsList.appendChild(listItem);
      });
    };

    searchBar.addEventListener("input", (event) => {
      const inputValue = event.target.value;
      const filteredList = EMPLOYEES_LIST.filter((employee) => {
        const fullName = `${employee.familyName}${employee.givenName}`;
        const readingFullName = `${employee.familyNameReading}${employee.givenNameReading}`;
        return (
          employee.familyName.includes(inputValue) ||
          employee.givenName.includes(inputValue) ||
          employee.familyNameReading.includes(inputValue) ||
          employee.givenNameReading.includes(inputValue) ||
          employee.employeeNumber.includes(inputValue) ||
          fullName.includes(inputValue) ||
          readingFullName.includes(inputValue)
        );
      });
      clearAndDisplaySuggestions(filteredList);
    });

    // 初期表示
    clearAndDisplaySuggestions(EMPLOYEES_LIST);

    return suggestionsList;
  }

  dialog_disappears(modalDialog) {
    /*ダイアログの外側をクリックしたときに閉じる*/
    modalDialog.addEventListener("click", (event) => {
      if (event.target === modalDialog) {
        this.dialog_close(modalDialog);
      }
    });
    return;
  }
  make_dialog_header() {
    const header = document.createElement("div");
    header.className = DIALOG_HEADER_CLASSNAME;
    return header;
  }
  make_dialog_title() {
    const title = document.createElement("div");
    title.className = DIALOG_TITLE_CLASSNAME;
    title.textContent = this.id;
    return title;
  }
  make_cancel_button(modalDialog) {
    /*ダイアログを閉じるボタンを作成*/
    const cancelButtonSpace = document.createElement("div");
    cancelButtonSpace.className = DIALOGBUTTON_CANCEL_CLASSNAME;
    const cancel_button = document.createElement("button");
    cancel_button.type = "button";
    cancel_button.innerHTML = "×";
    cancel_button.addEventListener("click", () => {
      this.dialog_close(modalDialog);
    });
    cancelButtonSpace.appendChild(cancel_button);
    return cancelButtonSpace;
  }
  add_dialog() {
    const modalDialog = document.getElementById(this.id);
    const wrappedAddTarget = document.createElement("div");
    wrappedAddTarget.addEventListener("click", function () {
      modalDialog.showModal();
    });
    const pElements = this.parent_target.getElementsByTagName("p");
    while (pElements.length !== 0) {
      wrappedAddTarget.appendChild(pElements[0]);
    }
    wrappedAddTarget.className = DIALOG_APPEARS_CLASSNAME;
    this.parent_target.appendChild(wrappedAddTarget);
  }
  show() {
    const modalDialog = document.getElementById(this.id);
    modalDialog.showModal();
  }
  update(dom) {
    /*既存のdomがあれば削除し、新規のdomを登録*/
    let remove_target = document.getElementById(this.id);
    if (remove_target !== null && remove_target !== undefined) {
      remove_target.parentNode.remove();
    }
    this.parent_target.appendChild(dom);
  }
  dialog_close(modalDialog) {
    let newIds = Dialog.ids.filter((item) => item !== this.id);
    Dialog.ids = newIds;
    modalDialog.close();
  }
}
