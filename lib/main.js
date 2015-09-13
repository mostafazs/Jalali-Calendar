//Jalali Calendar 0.1

var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
    id: "jalali-btn",
    label: "Jalali Calendar",
    icon: {
        "16": self.data.url('jalali-16.png'),
        "32": self.data.url('jalali-32.png'),
        "64": self.data.url('jalali-64.png')
    },
    onChange: handleChange
});

var panel = panels.Panel({
	width: 145,
	height: 30,
    contentURL: self.data.url("panel.html"),
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