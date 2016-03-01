/**
 * Main javascript file
 * @package Jalali Calendar
 * @version 1.0.0
 * @license GPL 2.0
 * @author Mostafa Ziasistani
 * @copyright 2016 Mostafa Ziasistani ( https://mostafazs.github.io )
 */

/**
 * Get current jalali day 
 * @todo Test Can You Use WebWorker Instead
 */
a = new Date();d= a.getDay();day= a.getDate();month = a.getMonth()+1;switch (month) {case 1: (day<21)? (month=10, day+=10):(month=11, day-=20); break;case 2: (day<20)? (month=11, day+=11):(month=12, day-=19); break;case 3: (day<21)? (month=12, day+=9):(month=1, day-=20); break;case 4: (day<21)? (month=1, day+=11):(month=2, day-=20); break;case 5:case 6: (day<22)? (month-=3, day+=10):(month-=2, day-=21); break;case 7:case 8:case 9: (day<23)? (month-=3, day+=9):(month-=2, day-=22); break;case 10:(day<23)? (month=7, day+=8):(month=8, day-=22); break;case 11:case 12:(day<22)? (month-=3, day+=9):(month-=2, day-=21); break;default: break;}


function dothis(){
	console.log("This function");
}

var {ToggleButton} = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");


var button = ToggleButton({
    id: "jalali-btn",
    label: "تقویم جلالی",
    icon: {
        "16": self.data.url('jalali-16.png'),
        "32": self.data.url('jalali-32.png'),
        "64": self.data.url('jalali-64.png')
    },
    onChange: handleChange,
	badge: day,
	badgeColor: "#2CA5E0"
});

var panel = panels.Panel({
	width: 145,
	height: 60,
    contentURL: self.data.url("panel.html"),
	contentScriptFile: self.data.url("shamsi_gregorian_date.js"),
	contentStyleFile: self.data.url("style.css"),
    onHide: handleHide
});

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

function handleHide() {
    button.state('window', {checked: false});
}

panel.port.on('hide', function () {
    panel.hide();
});