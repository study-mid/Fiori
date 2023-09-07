sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONMODEL) {
    "use strict";

    return Controller.extend("test.projectb1203.controller.Main", {
      onInit: function () {
        var oDatas = {
          name: "Park Hyewon",
          title: "M-V Binding",
          list: [
            { num1: 12, operator: "test", num2: 13, result: 0 },
            { num1: 12, operator: "test", num2: 13, result: 0 },
            { num1: 12, operator: "test", num2: 13, result: 0 },
            { num1: 12, operator: "test", num2: 13, result: 0 },
          ],
          age: 25,
          obj: { key: "valuevalue" },
        };
        var oModel = new JSONMODEL(oDatas);
        this.getView().setModel(oModel, "main");
      },

      onClick: function () {
        // var oNum1 = this.byId('num1');
        // var oNum2 = this.byId('num2');
        // var oOper = this.byId('operator');
        // var oResult = this.byId('result');
        // var sNum1 = parseInt(oNum1.getValue());
        // var sNum2 = parseInt(oNum2.getValue());
        // var sOper = oOper.getSelectedKey();

        // if (sOper == 'PLUS') {
        //     nResult = nNum1 + nNum2;
        // }
        // else if (sOper == 'MINUS') {
        //     nResult = nNum1 - nNum2;
        // }
        // else if (sOper == 'MULTIPLE') {
        //     nResult = nNum1 * nNum2;
        // }
        // else if (sOper == 'DIVISION') {
        //     nResult = nNum1 / nNum2;
        // }

        var nNum1 = this.byId("num1").getValue(),
          nNum2 = this.byId("num2").getValue(),
          oOper = this.byId("operator"),
          oResult = this.byId("result"),
          nResult = 0;

        nNum1 = Number(nNum1);
        nNum2 = Number(nNum2);

        switch (oOper.getSelectedKey()) {
          case "PLUS":
            nResult = nNum1 + nNum2;
            break;
          case "MINUS":
            nResult = nNum1 - nNum2;
            break;
          case "MULTIPLE":
            nResult = nNum1 * nNum2;
            break;
          case "DIVISION":
            nResult = nNum1 / nNum2;
            break;
        }

        alert("계산 완료");

        oResult.setText("계산 결과: " + nResult);
        this.onAdd({
          result: nResult,
          num1: nNum1,
          num2: nNum2,
          oper: oOper.getSelectedKey(),
        });
      },

      onChange: function (oEvent) {
        var nNum = Number(oEvent.getParameters().value);
        var button = this.byId("target_btn");
        var oOper = this.byId("operator");

        if (!nNum && oOper.getSelectedKey() == "DIVISION") {
          // 입력값이 없거나 0이면 에러 상태로 변경
          console.log(nNum);
          oEvent.getSource().setValueState("Error");

          button.setEnabled(false);
        } else {
          oEvent.getSource().setValueState("None");

          button.setEnabled(true);
        }
      },

      onAdd: function (result, num1, num2, oper) {
        // Main 모델의 list 배열 데이터를 가져오는 방법
        var oModel = this.getView().getModel("main"), // main 모델 가져오기
          // aList = oModel.getData().list, // list 배열 데이터 가져오기
          aList2 = oModel.getProperty("/list"), // list 배열 데이터 가져오기2
          oOper = this.byId("operator").getSelectedItem().getText();

        /*
        aList2에 새로운 데이터를 추가해야 한다.
        데이터 구조의 예시는 다음과 같다.
        => { num1: 12, operator: "test", num2: 13, result: 0},

        사용자가 입력한 계산식을 aList2에 추가하여 모델에 반영시키도록 한다.

        aList2.pust(객체);
         */

        aList2.push({
          num1: result.num1,
          // operator: result.oper,
          operator: oOper,
          num2: result.num2,
          result: result.result,
        });

        oModel.setProperty("/list", aList2);
      },
    });
  }
);
