sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, Fragment) {
    "use strict";

    return Controller.extend("exam.exprogramb12.controller.Main", {
      onInit: function () {
        var oData = {
          list: [{ curr: "USD" }, { curr: "EUR" }, { curr: "KRW" }],
        };

        this.getView().setModel(new JSONModel(oData), "currList");
      },

      onSearch: function () {
        var oCurrInput = this.byId("idCurrencyInput").getValue();
        var oCarrInput = this.byId("idCarrierInput").getValue();
        var oTable = this.byId("idCarriersTable");

        var aFilters = [];

        if (oCurrInput) {
          aFilters.push(
            new Filter({
              path: "Currcode",
              operator: "EQ",
              value1: oCurrInput,
            })
          );
        }
        if (oCarrInput) {
          aFilters.push(
            new Filter({
              path: "Carrname",
              operator: "Contains",
              value1: oCarrInput,
            })
          );
        }
        if (oCurrInput && oCarrInput) {
          aFilters.push(
            new Filter({
              path: "Currcode",
              operator: "EQ",
              value1: oCurrInput,
            })
          ),
            aFilters.push(
              new Filter({
                path: "Carrname",
                operator: "EQ",
                value1: oCarrInput,
              })
            );
        }
        oTable.getBinding("items").filter(aFilters);
      },

      onPress: function (oEvent) {
        var oDialog = sap.ui.getCore().byId("idDialog");
        var oModel = this.getView().getModel();
        var sPath = oEvent.getSource().getBindingContext().sPath;
        var oCarr = ""; //Carrname 받아올 변수
        // oModel.createKey(oCarr);
        // var sPath = oModel.createKey("/carrierSet", {
        //   OrderID: oParam.paramOrder,
        // });
        // var sPath =
        //   this.getView().bindElement(
        //     `/carrierSet(Carrid=${oParam.paramOrder})`
        //   );

        oModel.read(sPath, {
          urlParameters: { $expand: "to_Item" },
          success: function (oReturn) {
            console.log("successed");
            var oModel = new sap.ui.model.json.JSONModel(oReturn);
            this.getView().setModel(oModel, "CarrInfo");
            // oCarr = this.getView().getModel("CarrInfo").oData.Carrname;

            if (!oDialog) {
              Fragment.load({
                name: "exam.exprogramb12.view.Chart",
                type: "XML",
                controller: this,
              }).then(function (oDialog) {
                oDialog.setModel(oModel, "CarrInfo");
                // oDialog.setHeaderText(oCarr);
                debugger;
                oDialog.open();
              });
            } else {
              oDialog.open();
            }
          }.bind(this),
          error: function (oError) {
            console.log("failed");
          },
        });

        // if (!oDialog) {
        //   Fragment.load({
        //     name: "exam.exprogramb12.view.Chart",
        //     type: "XML",
        //     controller: this,
        //   }).then(function (oDialog) {
        //     // oDialog.setModel(oModel, "CarrInfo");
        //     // oDialog.setHeaderText(oCarr);
        //     // debugger;
        //     oDialog.open();
        //   });
        // } else {
        //   oDialog.open();
        // }
      },

      onClose: function (oEvent) {
        var oDialog = oEvent.getSource().getParent();

        oDialog.close();
      },

      onSelectionChange: function (oEvent) {
        // var sPath = oEvent.getParameters().listItem.getBindingContextPath();
        // var oModel = this.getView().getModel();
        var oTable = this.byId("idCarriersTable");
        var oRouter = this.getOwnerComponent().getRouter();
        var Carrid = oTable
          .getSelectedItem()
          .getBindingContext()
          .getObject().Carrid;
        debugger;

        oRouter.navTo("RouteDetail", {
          paramID: Carrid,
        });
      },
    });
  }
);
