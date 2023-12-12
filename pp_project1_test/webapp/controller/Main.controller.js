sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("ppproject1test.controller.Main", {
      onInit: function () {
        var oGeoMap = this.getView().byId("GeoMap");
        var oMapConfig = {
          MapProvider: [
            {
              name: "HEREMAPS",
              type: "",
              description: "",
              tileX: "256",
              tileY: "256",
              maxLOD: "20",
              copyright: "Tiles Courtesy of HERE Maps",
              Source: [
                {
                  id: "s1",
                  url: "https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/reduced.day/{LOD}/{X}/{Y}/256/png8?app_id=YOUR_APP_ID&app_code=YOUR_APP_CODE",
                },
                {
                  id: "s2",
                  url: "https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/reduced.day/{LOD}/{X}/{Y}/256/png8?app_id=YOUR_APP_ID&app_code=YOUR_APP_CODE",
                },
              ],
            },
          ],
          MapLayerStacks: [
            {
              name: "DEFAULT",
              MapLayer: {
                name: "layer1",
                refMapProvider: "HEREMAPS",
                opacity: "1.0",
                colBkgnd: "RGB(255,255,255)",
              },
            },
          ],
        };
        oGeoMap.setMapConfiguration(oMapConfig);
        oGeoMap.setRefMapLayerStack("DEFAULT");
      },
    });
  }
);
