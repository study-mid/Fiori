sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("projectb1205.controller.HelloPanel", {
      onInit: function () {},

      onShowHello: function () {
        // sap.m.MessageToast.show("Hello Panel Click");

        sap.m.MessageBox.success("버튼이 클릭되었습니다.", {
          title: "Success", // default
          onClose: function (action) {
            switch (action) {
              case "YES":
                sap.m.MessageToast.show("YES Clicked");
                break;
              case "NO":
                sap.m.MessageToast.show("NO Clicked");
                break;

              default:
                break;
            }
          },
          actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
          emphasizedAction: sap.m.MessageBox.Action.YES,
        });
      },
    });
  }
);
