sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("projectb1206.controller.Detail", {
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

        console.log(oParam.paramOrder);

        this.getView().bindElement(`/Orders(${oParam.paramOrder})`);
        // oParam 안에는 manifest.json에 등록된,
        // RouteDetail의 Parameter 값들이 있음
        // EntitySetName(Key1='value', Key2='')

        var sPath = oModel.createKey("/Orders", {
          OrderID: oParam.paramOrder,
        });

        oModel.read(sPath, {
          urlParameters: {
            $expand: "Order_Details",
          },
          success: function (oReturn) {
            console.log(oReturn); // json data => JSON Model에 넣어서 사용 가능
            // Detail.view.xml에서 사용하는 'Detail' JSONModel 만들어서
            // 해당 데이터를 담아놓고, Detail.view.xml에 Binding
          },
          error: function (oError) {},
        });
      },

      onNavMain: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteMain");
      },
    });
  }
);
