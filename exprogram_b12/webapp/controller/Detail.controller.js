sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("exam.exprogramb12.controller.Detail", {
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

        console.log(oParam.paramID);

        this.getView().bindElement(`/carrierSet(${oParam.paramID})`);
        // oParam 안에는 manifest.json에 등록된,
        // RouteDetail의 Parameter 값들이 있음
        // EntitySetName(Key1='value', Key2='')

        var sPath = oModel.createKey("/carrierSet", {
          Carrid: oParam.paramID,
        });
        debugger;
        oModel.read(sPath, {
          urlParameters: {
            $expand: "to_Flight",
          },
          success: function (oReturn) {
            var oModel = new sap.ui.model.json.JSONModel(oReturn);
            this.getView().setModel(oModel, "Flight");
          }.bind(this),
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
