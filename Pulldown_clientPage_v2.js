let SELECTED_BUTTON = null;
let SAVED_MENU = {
  TARGET_MENU: null,
  COLOR: null,
  BACKGROUNDCOLOR: null,
  FONT: null,
};

class Pulldown_clientPage extends Pulldown {
  pulldown_list; //プルダウンメニューの選択肢の配列

  constructor(id, parentTarget, pulldownList) {
    // pulldownList = [
    //   {
    //     menuName: String,
    //     url: String,
    //     employeeSelect: Boolean,
    //     displaySelect: Boolean,
    //   },
    // ];
    super(id, parentTarget);
    this.pulldown_list = pulldownList;
  }
  assemble() {
    /* parent_targetにappendするプルダウンdomの組み立て。プルダウンを出すイベントの付与 */
    const pulldown_menu = this.make_pulldown_menu();
    const wrapped_pulldown_menu = this.wrap(
      PULLDOWN_MENU_CLASSNAME,
      pulldown_menu
    );
    wrapped_pulldown_menu.id = this.id;
    wrapped_pulldown_menu.style.display = "none";
    const bounds = this.parent_target.getBoundingClientRect();
    if (IS_MOBILE) {
      wrapped_pulldown_menu.style.top = 1 + "px";
      wrapped_pulldown_menu.style.left = 1 + "px";
    } else {
      wrapped_pulldown_menu.style.top = bounds.bottom + 1 + "px";
      wrapped_pulldown_menu.style.left = bounds.left + "px";
    }
    return wrapped_pulldown_menu;
  }

  make_pulldown_menu() {
    /* プルダウンメニュー作成 */
    const pulldown = document.createElement("div");
    const pulldowns = document.createElement("div");
    const menu = document.createElement("ul");
    pulldown.appendChild(pulldowns);
    pulldown.appendChild(menu);
    const menuList = this.pulldown_list;

    menuList.forEach((elem) => {
      if (!elem.displaySelect) {
        return;
      }
      const choice = document.createElement("li");
      choice.textContent = elem.menuName;
      choice.addEventListener("click", function () {
        SAVED_MENU.TARGET_MENU = this;
        SAVED_MENU.COLOR = this.style.color;
        SAVED_MENU.BACKGROUNDCOLOR = this.style.background;
        SAVED_MENU.FONT = this.style.fontWeight;
        const computedStyle = window.getComputedStyle(choice);
        this.style.background = computedStyle.background;
        this.style.color = computedStyle.color;
        this.style.fontWeight = computedStyle.fontWeight;
        if (elem.employeeSelect) {
          /* メニュークリックで従業員選択ポップアップ出現 */
          const d = new Dialog_clientPage(elem.menuName, pulldowns, elem.url);
          d.update(d.assemble());
          d.show();
        } else {
          /* メニュークリックでリンク遷移 */
          const newWindow = window.open("about:blank");
          if (newWindow) {
            newWindow.location.href = elem.url;
          }
        }
      });
      menu.appendChild(choice);
    });

    menu.addEventListener("mouseenter", function () {
      if (SAVED_MENU.TARGET_MENU) {
        SAVED_MENU.TARGET_MENU.style.background = SAVED_MENU.BACKGROUNDCOLOR;
        SAVED_MENU.TARGET_MENU.style.color = SAVED_MENU.COLOR;
        SAVED_MENU.TARGET_MENU.style.fontWeight = SAVED_MENU.FONT;
      }
    });

    SAVED_MENU.TARGET_MENU = null;
    SAVED_MENU.COLOR = window.getComputedStyle(menu).color;
    SAVED_MENU.BACKGROUNDCOLOR = window.getComputedStyle(menu).background;
    SAVED_MENU.FONT = window.getComputedStyle(menu).fontWeight;

    return pulldown;
  }
  appear_pulldown(dom, target) {
    /* プルダウン出現のイベント付与 */
    target.addEventListener("click", function (e) {
      if (!e.target.closest("a")) {
        return;
      }
      const flag = dom.style.display;
      e.stopPropagation();
      if (SELECTED_BUTTON) {
        SELECTED_BUTTON.children[1].style.display = "none";
        SELECTED_BUTTON.children[0].style.opacity = 1;
        if (SELECTED_BUTTON === target) {
          SELECTED_BUTTON = null;
        } else {
          SELECTED_BUTTON = target;
          target.children[0].style.opacity = 0.7;
        }
      } else {
        SELECTED_BUTTON = target;
        target.children[0].style.opacity = 0.7;
      }
      dom.style.display = flag === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
      if (!target.contains(event.target)) {
        dom.style.display = "none";
        if (SELECTED_BUTTON) {
          if (event.target.closest("li")) {
            return;
          }
          SELECTED_BUTTON.children[0].style.opacity = 1;
          SELECTED_BUTTON = null;
        }
      }
    });
  }
  update(dom) {
    /*既存のdomがあれば削除し、新規のdomを登録*/
    let remove_target = document.getElementById(this.id);
    if (remove_target !== null && remove_target !== undefined) {
      remove_target.remove();
    }
    const target = this.parent_target;
    target.appendChild(dom);
    this.appear_pulldown(dom, target);
  }
}
