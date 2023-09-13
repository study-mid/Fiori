sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("odatacrudb12.controller.Main", {
      onInit: function () {
        var oDataModel = this.getOwnerComponent().getModel();

        // read = GET 요청
        // create = POST 요청
        // update = PUT 요청
        // delete = DELETE 요청

        this.getView().setModel(new JSONModel(), "view");
      },

      // GET : /EntitySetName('keyValue')
      onRead: function () {
        var oDataModel = this.getOwnerComponent().getModel(); // ODataModel
        var oModel = this.getView().getModel("view"); // JSONModel
        var oTable = this.byId("idMemberTable");
        var sValue = oTable
          .getSelectedItem()
          .getBindingContext()
          .getObject().MB_ID;

        var sPath = oDataModel.createKey("/MemberSet", {
          MB_ID: sValue,
        });

        // 전체조회(GET요청)
        oDataModel.read(sPath, {
          success: function (oReturn) {
            console.log(oReturn);
            // 읽어온 데이터를 JSONModel에 세팅
            oModel.setProperty("/", oReturn);
          },
          error: function (oError) {
            console.log("Error 발생");
          },
        });
      },

      // POST : /EntitySetName + BODY정보()
      onCreate: function () {
        var oDataModel = this.getOwnerComponent().getModel(); // ODataModel
        var oJSONModel = this.getView().getModel("view"); // JSONModel
        // var oBody = {
        //   MB_ID: "10000212",
        //   MB_NM: "AAA",
        //   TELNO: "010-0000-0000",
        //   EMAIL: "AAA@naver.com",
        //   MB_ST: "B",
        // };
        // 생성할 데이터 구성
        var oBody = oJSONModel.getData(); // JSON 데이터로 구성되어 있음

        // oDataModel.create('경로', {생성할 데이터-JSON포맷}, {옵션정보});
        oDataModel.create("/MemberSet", oBody, {
          success: function (oReturn) {
            debugger;
          },
          error: function (oError) {},
        });
      },

      // PUT : /EntitySetName('keyValue') + Body
      onUpdate: function () {
        var oDataModel = this.getOwnerComponent().getModel(); // ODataModel
        var oJSONModel = this.getView().getModel("view"); // JSONModel
        var oBody = oJSONModel.getData();

        // 아래와 같이 별도 구성해도 됨.
        var obj = {
          MB_NM: oBody.MB_NM,
          TELNO: oBody.TELNO,
          EMAIL: oBody.EMAIL,
          MB_ST: oBody.MB_ST,
        };

        oDataModel.update(`/MemberSet('${oBody.MB_ID}')`, obj, {
          success: function (oReturn) {
            sap.m.MessageToast.show("데이터 변경 완료");
            debugger;
          },
          error: function (oError) {},
        });
      },

      // DELETE : /EntitySetName('keyValue')
      onDelete: function () {
        var oDataModel = this.getOwnerComponent().getModel(); // ODataModel
        var oTable = this.byId("idMemberTable");
        var sValue = oTable
          .getSelectedItem()
          .getBindingContext()
          .getObject().MB_ID;
        var sPath = oDataModel.createKey("/MemberSet", {
          MB_ID: sValue,
        }); // "/MemberSet('10000001')" 형태의 문자열과 동일

        oDataModel.remove(sPath, {
          success: function (oReturn) {
            sap.m.MessageToast.show("데이터 삭제 완료");
            debugger;
            oDataModel.refresh(true); // optional. 모델 리프레시
          },
          error: function (oError) {},
        });
      },
    });
  }
);
