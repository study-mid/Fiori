sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONMODEL) {
    "use strict";

    return Controller.extend("practiceb1201.controller.Main", {
      onInit: function () {
        var oData = {
          title: "계산기",
          cal: [{ PLUS: "+", MINUS: "-", MULTIPLE: "*", DIVISION: "/" }],
          list: [], //[{ idNum1: "", idSelect: "", idNum2: "", idResult: "" }],
        };
        var oModel = new JSONMODEL("/list");
        this.getView().setModel(oModel);
      },

      onClick: function () {
        var nNum1 = Number(this.byId("idNum1").getValue()),
          nNum2 = Number(this.byId("idNum2").getValue()),
          nSelect = this.byId("idSelect"),
          oResult = this.byId("idResult"),
          nResult = 0;

        switch (nSelect.getSelectedKey()) {
          case "PLUS":
            nResult = nNum1 + nNum2;
            break;
          case "MINUS":
            nResult = nNum1 - nNum2;
            break;
          case "MULIPLE":
            nResult = nNum1 * nNum2;
            break;
          case "DIVISION":
            nResult = nNum1 / nNum2;
            break;
        }

        alert("계산 완료");

        oResult.setText("계산 결과: " + nResult);

        this.onAdd({
          // 객체 형태로 onAdd에 넘김
          num1: nNum1,
          oper: nSelect.getSelectedKey(),
          num2: nNum2,
          result: nResult,
        });
      },

      onAdd: function () {},
    });
  }
);
