sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, Fragment, MessageToast) {
    "use strict";

    return Controller.extend("exam.exprogramb12.controller.Main", {
      onInit: function () {
        var oData = {
          list: [{ curr: "USD" }, { curr: "EUR" }, { curr: "KRW" }],
        };

        this.getView().setModel(new JSONModel(oData), "currList");
        this.getView().setModel(new JSONModel(oData), "popup");
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
        var oModel = this.getView().getModel();
        var oPopupModel = this.getView().getModel("popup");
        var sPath = oEvent.getSource().getBindingContext().sPath;
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
            this.onOpenDialog(oReturn);
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

      onOpenDialog: function (oReturn) {
        var oDialog = sap.ui.getCore().byId("idDialog");
        var oModel = new sap.ui.model.json.JSONModel(oReturn);

        if (!oDialog) {
          Fragment.load({
            name: "exam.exprogramb12.view.Chart",
            type: "XML",
            controller: this,
          }).then(function (oDialog) {
            oDialog.open();
          });
        } else {
          oDialog.open();
        }
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
        var msg = "Column unselected.";

        if (oTable.getSelectedItem()) {
          // oRouter.navTo(/**라우트 객체 이름 */);
          var Carrid = oTable
            .getSelectedItem()
            .getBindingContext()
            .getObject().Carrid;

          oRouter.navTo("RouteDetail", {
            paramID: Carrid,
          });

          oRouter.navTo("RouteDetail", {
            paramOrder: OrderID,
            paramProduct: ProductID,
          });
        } else {
          MessageToast.show(msg);
        }
      },
    });
  }
);
