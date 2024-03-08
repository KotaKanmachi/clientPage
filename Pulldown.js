const PULLDOWN_CLASSNAME = "nkr-pulldown";
const PULLDOWN_MENU_CLASSNAME = "nkr-pulldownMenu";
const PULLDOWN_BUTTON_CLASSNAME = "nkr-pulldownButton";

class Pulldown {
  parent_target; //プルダウンメニューを実装するdom
  id;
  static ids = []; //pulldown classで作成したpulldownのid一覧

  constructor(id, parentTarget) {
    this.id = id;
    if (this.regist_id()) {
      console.log("this id is collision with previous id.\nfailed to resist.");
      return;
    }
    this.parent_target = parentTarget;
  }
  regist_id() {
    /* 同じpulldownクラスを用いて同一idのインスタンスが作成されていないかの確認 */
    if (Pulldown.ids.indexOf(this.id) > 0) return true;
    Pulldown.ids.push(this.id);
    return false;
  }
  assemble() {
    /* parent_targetにappendするdomの組み立て。オーバーライド推奨 */
    const pulldown = this.make_pulldown();
    const pulldown_menu = this.make_pulldown_menu();
    const wrapped_buttonText = this.wrap(
      PULLDOWN_BUTTON_CLASSNAME,
      this.parent_target
    );
    pulldown.appendChild(wrapped_buttonText);
    pulldown.appendChild(pulldown_menu);
    this.parent_target.appendChild(pulldown);
    const toggleDropdown = function () {
      pulldown_menu.classList.toggle("show");
    };
    wrapped_buttonText.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleDropdown();
    });

    return pulldown;
  }
  update(dom) {
    /*既存のdomがあれば削除し、新規のdomを登録*/
    let remove_target = document.getElementById(this.id);
    if (remove_target !== null && remove_target !== undefined) {
      remove_target.remove();
    }
    this.parent_target.appendChild(dom);
  }
  make_pulldown() {
    /* プルダウン作成 */
    const pulldown = document.createElement("nav");
    pulldown.className = PULLDOWN_CLASSNAME;
    pulldown.id = this.id;
    return pulldown;
  }
  make_pulldown_menu() {
    /* プルダウンメニュー作成 */
    const menu = document.createElement("nav");
    menu.className = PULLDOWN_MENU_CLASSNAME;
    return menu;
  }
  wrap(className, target) {
    /* 引数のターゲットをwrapする */
    const wrap = document.createElement("nav");
    wrap.className = className;
    wrap.appendChild(target);
    return wrap;
  }
}
