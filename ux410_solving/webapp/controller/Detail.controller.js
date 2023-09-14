sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("sap.btp.ux410solving.controller.Detail", {
      onInit: function () {
        // onInit은 최초 한번만 타짐
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._patternMatched, this);
        // Detail Route 객체를 가져와서,
        // 패턴이 일치하면 _patternMatched 함수를 실행하겠다는 뜻
      },

      _patternMatched: function (oEvent) {
        // url이 일치할때마다 실행
        // 파라미터로 받은 값들 가져오기
        var oParam = oEvent.getParameters().arguments;
        var oModel = this.getView().getModel();

        // this.getView().bindElement(
        //   `/Order_Details(OrderID=${oParam.paramOrder},ProductID=${oParam.paramType})`
        // );
        // oParam 안에는 manifest.json에 등록된,
        // RouteDetail의 Parameter 값들이 있음
        // EntitySetName(Key1='value', Key2='')

        var sPath = oModel.createKey("/Order_Details", {
          OrderID: oParam.paramOrder,
          ProductID: oParam.paramProduct,
        });

        oModel.read(sPath, {
          success: function (oReturn) {
            var oModel = new sap.ui.model.json.JSONModel(oReturn);
            this.getView().setModel(oModel, "OrderDetails");
          }.bind(this),
          error: function (oError) {},
        }); // Odata모델을 Json 모델로 다루는법
      },

      onNavMain: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteMain");
      },
    });
  }
);
