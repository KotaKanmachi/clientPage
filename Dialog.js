const POPUPDIALOG_CLASSNAME = "nkr-dialog";
const POPUPDIALOG_FORM_CLASSNAME = "nkr-dialogForm";
const POPUPDIALOG_OPENBUTTON_CLASSNAME = "nkr-dialogOpenButton";
class Dialog {
  parent_target; //dialog domを挿入する親dom
  id; //作成したdialog domのid
  static ids = []; //dialog classで作成したdialogのid一覧

  constructor(id, parentTarget) {
    this.id = id;
    if (this.regist_id()) {
      console.log("this id is collision with previous id.\nfailed to resist.");
      return;
    }
    this.parent_target = parentTarget;
  }
  assemble() {
    /*parent_targetにappendするdomの組み立て。オーバーライド推奨*/
    const dialog = this.make_dialog();
    const form = this.make_form();
    const wraped_form = this.wrap_form(form);
    dialog.appendChild(wraped_form);
    const wraped_dialog = this.wrap_dialog(dialog);
    return wraped_dialog;
  }
  show() {
    document.getElementById(`${this.id}`).show();
  }
  showModal() {
    document.getElementById(`${this.id}`).showModal();
  }
  close() {
    document.getElementById(`${this.id}`).close();
  }

  regist_id() {
    /*
    同じdialogクラスを用いて同一idのインスタンスが作成されていないかの確認
    */
    if (Dialog.ids.indexOf(this.id) > 0) return true;
    Dialog.ids.push(this.id);
    return false;
  }
  update(dom) {
    /*既存のdomがあれば削除し、新規のdomを登録*/
    let remove_target = document.getElementById(this.id);
    if (remove_target != null) {
      while (remove_target.parentNode != this.parent_target) {
        remove_target = remove_target.parentNode;
      }
      remove_target.remove();
    }
    this.parent_target.appendChild(dom);
  }
  make_dialog() {
    /*dialog elementを作成*/
    const dialog = document.createElement("dialog");
    dialog.id = this.id;
    dialog.ariaLabel = `${this.id}_areaLabel`;
    return dialog;
  }
  make_form() {
    /*form elementを作成*/
    const form = document.createElement("form");
    form.method = "dialog";
    form.id = `${this.id}_form`;
    return form;
  }
  wrap_dialog(dialog) {
    /*dialog elementをdivでwrapする*/
    const wrapped_dialog = document.createElement("div");
    wrapped_dialog.className = POPUPDIALOG_CLASSNAME;
    wrapped_dialog.appendChild(dialog);
    return wrapped_dialog;
  }
  wrap_form(form) {
    /*form elementをdivでwrapする*/
    const wrapped_form = document.createElement("div");
    wrapped_form.className = POPUPDIALOG_FORM_CLASSNAME;
    wrapped_form.appendChild(form);
    return wrapped_form;
  }
  make_openButton() {
    /*
    dialog boxを開くボタンをparentの直後に配置
    デバッグ用のサンプルプログラム
     */
    const openButton = document.createElement("input");
    openButton.type = "button";
    openButton.value = "従業員選択";
    const modalDialog = document.getElementById(this.id);
    openButton.addEventListener("click", function() {
      modalDialog.showModal();
    });
    
    const openButtonSpace = document.createElement("div");
    openButtonSpace.className = POPUPDIALOG_OPENBUTTON_CLASSNAME;
    openButtonSpace.appendChild(openButton);
    this.parent_target.appendChild(openButtonSpace);
  }
}
