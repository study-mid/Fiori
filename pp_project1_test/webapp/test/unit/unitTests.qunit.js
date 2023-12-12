/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"pp_project1_test/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
