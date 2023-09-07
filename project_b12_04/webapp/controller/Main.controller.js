sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONMODEL) {
    "use strict";

    return Controller.extend("projectb1204.controller.Main", {
      onInit: function () {
        var oDatas = {
          list: [
            {
              Name: "",
              Address: "",
              Phone: "",
              Department: "",
            },
          ],
        };

        var oModel = new JSONMODEL(oDatas);
        this.getView().setModel(oModel);
      },

      onAdd: function () {
        var oModel = this.getView().getModel(),
          aList = oModel.getProperty("/list");

        aList.push({
          Name: "",
          Address: "",
          Phone: "",
          Department: "",
        });

        oModel.setProperty("/list", aList);
      },

      onDelete: function (oEvent) {
        var oTable = this.byId("idTable"),
          oModel = this.getView().getModel(),
          aModelData = oModel.getProperty("/list"), // 배열 데이터
          aIndex = oTable.getSelectedIndices(); // [0,3,7]

        for (var i = aIndex.length - 1; i >= 0; i--) {
          // -> aIndex.length = 3: i->2~0
          // var element = aIndex[i];
          // aModelData.splice(element, 1); ↓아래와 같이 한 줄로 축소 가능
          aModelData.splice(aIndex[i], 1);
        }
        oModel.setProperty("/list", aModelData);
      },

      onRowActionDel: function (oEvent) {
        // var oModel = this.getView().getModel(),
        //   aModelData = oModel.getProperty("/list"),
        var aList = this.getView().getModel().getData().list;
        var nSelectedIndex = oEvent.getParameter("row").getIndex();

        // .splice를 통해 단건 삭제 후 적용
        aModelData.splice(nSelectedIndex, 1);
        this.getView().getModel().setProperty("/list", aList);
        // this.getView().getModel().setData({list:aList}, true); 와 같음
      },
    });
  }
);
