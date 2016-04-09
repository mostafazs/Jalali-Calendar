/**
 * Main javascript file
 * @package Jalali Calendar
 * @version 1.2.0
 * @license GPL 2.0
 * @author Mostafa Ziasistani
 * @copyright 2016 Mostafa Ziasistani ( https://mostafazs.github.io )
 */
var {ToggleButton} = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var timers = require("sdk/timers");

var panel = panels.Panel({
	width: 180,
	height: 60,
    contentURL: self.data.url("panel.html"),
    //contentScriptFile: self.data.url("shamsi_gregorian_date.js"),
	contentStyleFile: self.data.url("style.css"),
    onHide: handleHide
});

var button = ToggleButton({
    id: "jalali-btn",
    label: "تقویم جلالی",
    icon: {
        "16": self.data.url('jalali-16.png'),
        "32": self.data.url('jalali-32.png'),
        "64": self.data.url('jalali-64.png')
    },
    onChange: handleChange,
	badge: "0",
	badgeColor: "#2CA5E0"
});

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
    //Make addon reload
    panel.port.emit('from-handleChange');
}

function handleHide() {
    button.state('window', {checked: false});
}

panel.port.on('hide', function () {
    panel.hide();
});

panel.port.on('show-badge',function(data){
	//console.log("Show-badge clicked");
	//console.log(data);
	button.badge = data[2];
});

//Set Intercal For Button Updates(60 Min)
timers.setInterval(UpdateButton, 3600000);

//Update Current Day On Button
function UpdateButton() {
    panel.port.emit('updateButton');
}