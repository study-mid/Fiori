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
        // 신문법
        var oDialog = sap.ui.getCore().byId("idDialog");
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
          debugger;
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
      onCustValueHelp: function () {
        // 구문법
        var oDialog = this.byId("idCustDialog");
        var oModel = this.getView().getModel();
        debugger;
        if (!oDialog) {
          this.loadFragment({
            name: "projectb1206.view.fragment.CustomerID",
            type: "XML",
            controller: this,
          }).then(function (oDialog2) {
            oDialog.setModel(oModel);
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
        debugger;
        oTable.getBinding("rows").filter(aFilters);
        // cTable.getBinding("rows").filter(aFilters);
      },

      onSearch: function () {
        var oTable = this.byId("idProductsTable");
        var oOrderInput = this.byId("idOrderInput").getValue();
        var oCustInput = this.byId("idCustomInput").getValue();
        var oDateRange = this.byId("idDateInput");
        var aFilters = [];

        // 230911 미완 - Search 기능 완성X
        // oOrderInput && oCustInput일 때가 없어서인듯
        // if (oOrderInput) {
        //   var oFilter1 = new Filter({
        //     path: "OrderID",
        //     operator: "EQ",
        //     value1: oOrderInput,
        //   });
        // }
        // if (oCustInput) {
        //   var oFilter2 = new Filter({
        //     path: "CustomerID",
        //     operator: "EQ",
        //     value1: oCustInput,
        //   });
        // }
        // if (oDateRange.getDateValue() && oDateRange.getSecondDateValue()) {
        //   var oFilter3 = new Filter({
        //     path: "OrderDate",
        //     operator: "BT",
        //     value1: oDateRange.getDateValue(),
        //     value2: oDateRange.getSecondDateValue(),
        //   });
        // }
        // aFilters.push(oFilter1);
        // aFilters.push(oFilter2);
        // aFilters.push(oFilter3);
        debugger;

        if (oOrderInput) {
          aFilters.push(
            new Filter({
              path: "OrderID",
              operator: "EQ",
              value1: oOrderInput,
            })
          );
        } else if (oCustInput) {
          aFilters.push(
            new Filter({
              path: "CustomerID",
              operator: "EQ",
              value1: oCustInput,
            })
          );
        } else if (oOrderInput && oCustInput) {
          aFilters.push(
            new Filter({
              path: "OrderID",
              operator: "EQ",
              value1: oOrderInput,
            })
          ),
            aFilters.push(
              new Filter({
                path: "CustomerID",
                operator: "EQ",
                value1: oCustInput,
              })
            );
        }
        if (oDateRange.getDateValue() && oDateRange.getSecondDateValue()) {
          aFilters.push(
            new Filter({
              path: "OrderDate",
              operator: "BT",
              value1: oDateRange.getDateValue(),
              value2: oDateRange.getSecondDateValue(),
            })
          );
        }

        // oTable
        // .getBinding("items")
        // .filter((aFilters.length && aFilters) || undefined);

        oTable.getBinding("items").filter(aFilters);
      },

      onNavDetail: function () {
        // Detail.view.xml로 이동
        var oRouter = this.getOwnerComponent().getRouter();
        // oRouter.navTo(/**라우트 객체 이름 */);
        oRouter.navTo("RouteDetail", {
          paramOrder: "OrderID",
          // param2: "Option", -> Optional
        }); // -> 히스토리 클리어하는 navTo 코드
        // oRouter.navTo("RouteDetail");
      },

      onSelectionChange: function (oEvent) {
        var sPath = oEvent.getParameters().listItem.getBindingContextPath();
        var oModel = this.getView().getModel();
        var oRouter = this.getOwnerComponent().getRouter();

        // oDataModel.getProperty(경로) 해서 해당 Row의 전체 데이터 가져오기
        // => 전체데이터.OrderId를 통해 OrderId 값을 얻을 수 있다. (data.OrderId)
        var OrderID = oModel.getProperty(sPath).OrderID;
        debugger;
        // Detail 화면으로 이동
        // => 이동 시, 해당 OrderID를 필수 파라미터로 포함
        oRouter.navTo("RouteDetail", {
          paramOrder: OrderID,
        });
        // <테스트>
        // Detail 라우터의 URL에 OrderID 값이 잘 들어오는지 확인
      },
    });
  }
);
