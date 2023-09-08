sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("projectb1206.controller.Main", {
      formatter: {
        fnDateString: function (oDate) {
          if (oDate) {
            var oDateTimeInstance =
              sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd",
              });

            return oDateTimeInstance.format(oDate);
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

        if (!oDialog) {
          Fragment.load({
            name: "projectb1206.view.fragment.Order",
            type: "XML",
            controller: this,
          }).then(function (oDialog) {
            oDialog.setModel(oModel);
            oDialog.open();
          });
        } else {
          oDialog.open();
        }
        // this.loadFragment({
        //   // this는 현재 controller
        //   name: "projectb1206.view.fragment.Order",
        //   type: "XML",
        //   // mvc.controller-methods의 소스코드
        // }).then(
        //   function (oDialog) {
        //     oDialog.setModel(oModel);
        //     oDialog.open();
        //   }.bind(this)
        // );
      },

      onClose: function (oEvent) {
        var oDialog = oEvent.getSource().getParent();

        oDialog.close();
      },

      onBeforeOpen: function () {
        var oTable = sap.ui.getCore().byId("idOrderTable");
        var aFilters = [
          new Filter({
            path: "EmployeeID",
            operator: "GE", // FilterOperator.GE
            value1: 4,
          }),
          new Filter({
            path: "CustomerID",
            operator: "Contains", // FilterOperator.Contains
            value1: "R",
          }),
        ];
        var oFilter = new Filter({
          path: "EmployeeID",
          operator: "GE",
          value1: 4,
        });
        // oTable의 rows에 바인딩된 정보를 가져와서
        // 바인딩 정보 중 filter 안에 필터 객체를 추가
        // -> 이 때 filter() 안에는 Object 또는 Array 형태가 들어 갈 수 있음
        // oTable.getBinding('rows').filter() => 이렇게 하면 필터 초기화

        oTable.getBinding("rows").filter(aFilters);
        debugger;
      },
    });
  }
);
