/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"odatacrud_b12/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
