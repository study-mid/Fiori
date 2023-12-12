sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/unified/library",
    // "sap/ui/core/date/UI5Date",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, unifiedLibrary) {
    "use strict";
    var CalendarDayType = unifiedLibrary.CalendarDayType;

    return Controller.extend("zbcpp120.controller.Main", {
      // DateFormatter: function (oDate) {
      //   // 바인딩된 값이 oDate로 넣어짐
      //   return UI5Date.getInstance(oDate); // 바인딩된 값을 UI5Date 형식으로 변환 후 리턴
      // },

      //formatter 객체 안에다 format function들을 넣고 관리
      formatter: {
        //fnDateString => 날짜 객체를 'yyyy-MM-dd' 형태로 변경
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

      onInit: function () {
        // Model Setting -> stateModel, popupModel
        this.getView().setModel(new JSONModel(), "formModel");
        this.getView().setModel(new JSONModel(), "popupModel");

        // stateModel = sideContent visual setting model
        var oStateModel = new JSONModel();
        oStateModel.setData({
          legendShown: false,
        });
        this.getView().setModel(oStateModel, "stateModel");
      },

      handleAppointmentSelect: function (oEvent) {
        let oModel = this.getView().getModel();
        let oFormModel = this.getView().getModel("formModel");
        let oPopupModel = this.getView().getModel("popupModel");
        let sBindPath = oEvent
          .getParameters()
          .appointment.getBindingContext().sPath;
        var oStateModel = this.getView().getModel("stateModel");
        var flag = false;
        debugger;
        // formModel = sideContent data setting model
        oModel.read(sBindPath, {
          urlParameters: { $expand: "ItemSet" },
          success: function (oReturn) {
            console.log(oReturn);
            oFormModel.setData(oReturn);
            flag = true;
          }.bind(this),
          error: function () {
            console.log("error: FormModel");
          },
        });

        oModel.read(sBindPath, {
          success: function (oReturn) {
            console.log(oReturn);
            oPopupModel.setData(oReturn);
            flag = true;
          }.bind(this),
          error: function () {
            console.log("error: popupModel");
          },
        });

        // if (flag) {
        oStateModel.setData({
          legendShown: true,
        });
        this.getView().setModel(oStateModel, "stateModel");
        // }

        // this.onOpenDialog();
      },

      onButtonPress: function () {
        var oStateModel = this.getView().getModel("stateModel");

        oStateModel.setData({
          legendShown: false,
        });
        this.getView().setModel(oStateModel, "stateModel");
      },

      handleMoreLinkPress: function () {},
    });
  }
);
