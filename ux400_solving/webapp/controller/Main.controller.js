sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("sap.btp.ux400solving.controller.Main", {
      formatter: {
        transformDiscontinued: function (oData) {
          var ODataModel = oData ? "Yes" : "No";
          return ODataModel;
        },
      },

      onInit: function (oEvent) {
        var oDatas = {
          list: [],
        };

        var oModel = new JSONModel(oDatas);
        this.getView().setModel(oModel, "list");
      },

      onRandomPress: function () {
        var nInput = this.byId("idInput"),
          oModel = this.getView().getModel("list"),
          aList = oModel.getProperty("/list"),
          nRand = Math.floor(Math.random() * 100) + 1;

        nInput.setValue(nRand);
        nInput.setValueState("None");

        aList.push({ value: nRand });
        oModel.setProperty("/list", aList);
      },

      onOpenProduct: function () {
        var oDialog = this.byId("idDialog");
        var oModel = this.getView().getModel();

        if (oDialog) {
          oDialog.open();
        } else {
          this.loadFragment({
            name: "sap.btp.ux400solving.view.fragment.Products",
            type: "XML",
          }).then(
            function (oDialog) {
              oDialog.setModel(oModel);
              oDialog.open();
            }.bind(this)
          );
        }
      },

      onClose: function (oEvent) {
        var oButton = oEvent.getSource();
        var oDialog = oButton.getParent();

        oDialog.close();
      },

      onValueChange: function (oEvent) {
        var nNum = Number(oEvent.getParameters().value),
          oModel = this.getView().getModel("list"),
          aList = oModel.getProperty("/list");

        if (nNum <= 100 && nNum >= 1) {
          aList.push({ value: nNum });
          oModel.setProperty("/list", aList);
        } else {
          oEvent.getSource().setValueState("Error");
          oEvent
            .getSource()
            .setValueStateText("1이상 100이하의 숫자를 입력하세요.");
        }
      },
    });
  }
);
