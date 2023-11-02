sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/Fragment"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment) {
    "use strict";

    return Controller.extend("projectb1210.controller.Main", {
      onInit: function () {
        this.byId("idImage").setSrc(_rootPath + "/image/image1.jpg");
      },

      onValueHelp: function () {
        var oDialog = sap.ui.getCore().byId("idDialog");
        var oModel = this.getView().getModel("scarr");

        if (!oDialog) {
          Fragment.load({
            name: "projectb1210.view.Dialog",
            type: "XML",
            controller: this,
          }).then(function (oDialog) {
            oDialog.setModel(oModel, "scarr");
            oDialog.open();
          });
        } else {
          oDialog.setModel(oModel, "scarr");
          oDialog.open();
        }
      },

      onClose: function (oEvent) {
        var oDialog = oEvent.getSource().getParent();

        oDialog.close();
      },
    });
  }
);
