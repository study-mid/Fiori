sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/Fragment"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment) {
    "use strict";

    return Controller.extend("projectb1206.controller.Main", {
      formatter: {
        fnDateString: function (oDate) {
          if (oDate) {
            var oDateTimeInstance =
              sap.ui.core.foramt.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd",
              });

            return oDateTimeInstance.foramt(oDate);
          }
        },
      },

      onInit: function () {},

      onValueHelp: function () {
        var oDialog = this.byId("idDialog");
        var oModel = this.getView().getModel();
        //manifest.json 의 모델을 가져오게된다.
        // var oDialog = this.byId("idDialog");
        // oOrderID = this.byId("OrderID").getValue();
        // oCustomerID = this.byId("CustomerID").getValue();
        // oEmployeeID = this.byId("EmployeeID").getValue();

        if (oDialog) {
          oDialog.open();
        } else {
          this.loadFragment({
            // this는 현재 controller
            name: "projectb1206.view.fragment.Order",
            type: "XML",
            // mvc.controller-methods의 소스코드
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
    });
  }
);
