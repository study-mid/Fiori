sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("sap.btp.ux410solving.controller.Main", {
      onInit: function () {
        var oData = {
          list: [
            { type: "bar" },
            { type: "column" },
            { type: "line" },
            { type: "donut" },
          ],
        };

        this.getView().setModel(new JSONModel(oData), "typeList");
      },

      onSearch: function () {
        var oDataset = this.byId("idFlattenedDataset");
        var oOrderInput = this.byId("idOrderInput").getValue();
        var oTypeInput = this.byId("idTypeInput");
        var oType = oTypeInput.getValue();
        var oVizFrame = this.byId("idVizFrame");

        var aFilters = [];

        if (oOrderInput) {
          aFilters.push(
            new Filter({
              path: "OrderID",
              operator: "EQ",
              value1: oOrderInput,
            })
          );
        }

        if (
          oType == "bar" ||
          oType == "column" ||
          oType == "line" ||
          oType == "donut"
        ) {
          oTypeInput.setValueState("None");
          oVizFrame.setVizType(oType);
        } else {
          oTypeInput.setValueState("Error");
        }

        oDataset.getBinding("data").filter(aFilters);
      },

      onAfterRendering: function () {
        var oTypeInput = this.byId("idTypeInput");
        oTypeInput.setSelectedKey("bar");
      },

      onSelectData: function (oEvent) {
        var sPath = oEvent.getParameters().data[0].data;
        var oRouter = this.getOwnerComponent().getRouter();

        var OrderID = sPath.OrderID;
        var ProductID = sPath.ProductID;

        debugger;

        // oRouter.navTo(/**라우트 객체 이름 */);
        oRouter.navTo("RouteDetail", {
          paramOrder: OrderID,
          paramProduct: ProductID,
        });
      },
    });
  }
);
