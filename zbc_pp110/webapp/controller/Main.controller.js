sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter) {
    "use strict";

    return Controller.extend("zbcpp110.controller.Main", {
      formatter: {
        transformDiscontinued: function (oData) {
          var ODataModel = oData.indexOf("TT") >= 0 ? "트랙터" : "드론";
          return ODataModel;
        },
      },

      onInit: function () {
        var oData = {
          list: [{ plnt: "ASP" }, { plnt: "USP" }, { plnt: "NJP" }],
        };

        this.getView().setModel(new JSONModel(oData), "plntList");

        var oDataModel = this.getOwnerComponent().getModel();
        this.getView().setModel(new JSONModel(), "view");
      },

      onSearch: function () {
        var oPlntInput = this.byId("idPlntInput").getSelectedKeys();
        var oTable = this.byId("table");
        var aFilters = [];

        if (oPlntInput) {
          aFilters.push(
            new Filter({
              path: "PlntCd",
              operator: "Contains",
              value1: oPlntInput,
            })
          );
        }
        oTable.getBinding("items").filter(aFilters);
      },
    });
  }
);
