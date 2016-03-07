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
/**
 * @deprecate
 */
//a = new Date();d= a.getDay();day= a.getDate();month = a.getMonth()+1;switch (month) {case 1: (day<21)? (month=10, day+=10):(month=11, day-=20); break;case 2: (day<20)? (month=11, day+=11):(month=12, day-=19); break;case 3: (day<21)? (month=12, day+=9):(month=1, day-=20); break;case 4: (day<21)? (month=1, day+=11):(month=2, day-=20); break;case 5:case 6: (day<22)? (month-=3, day+=10):(month-=2, day-=21); break;case 7:case 8:case 9: (day<23)? (month-=3, day+=9):(month-=2, day-=22); break;case 10:(day<23)? (month=7, day+=8):(month=8, day-=22); break;case 11:case 12:(day<22)? (month-=3, day+=9):(month-=2, day-=21); break;default: break;}
/**
	 * Get shamsi date ( new function )
	 * 
	 * @since 1.0.1
	 * @see depracated previous code
	 */	
	if(typeof JCD==="undefined")var JCD={};if(typeof A$!=="function")var A$=function(a){return document.getElementById(a)};if(typeof cTN!=="function")var cTN=function(a){return document.createTextNode(a)};JCD.JDate=function(a){var c=A$(a),b=new Date,b=jd_to_persian(gregorian_to_jd(b.getFullYear(),b.getMonth()+1,b.getDate())),b=ConvertEnglishNumsToPersian(b[2].toString()+" "+PERSIAN_MONTH_NAMES[b[1]-1]+" "+b[0].toString());for(setTimeout(function(){JCD.JDate(a)},6E4);c.firstChild;)c.removeChild(c.firstChild);c.appendChild(cTN(b))};var GREGORIAN_EPOCH=1721425.5,PERSIAN_EPOCH=1948320.5,PERSIAN_MONTH_NAMES="\u0641\u0631\u0648\u0631\u062f\u06cc\u0646,\u0627\u0631\u062f\u06cc\u0628\u0647\u0634\u062a,\u062e\u0631\u062f\u0627\u062f,\u062a\u06cc\u0631,\u0645\u0631\u062f\u0627\u062f,\u0634\u0647\u0631\u06cc\u0648\u0631,\u0645\u0647\u0631,\u0622\u0628\u0627\u0646,\u0622\u0630\u0631,\u062f\u06cc,\u0628\u0647\u0645\u0646,\u0627\u0633\u0641\u0646\u062f".split(",");function mod(a,c){return a-c*Math.floor(a/c)}function leap_persian(a){return((a-(a>0?474:473))%2820+512)*682%2816<682}function persian_to_jd(a,c,b){var d;a-=a>=0?474:473;d=474+mod(a,2820);return b+(c<=7?(c-1)*31:(c-1)*30+6)+Math.floor((d*682-110)/2816)+(d-1)*365+Math.floor(a/2820)*1029983+(PERSIAN_EPOCH-1)}function jd_to_persian(a){var c,b,d,a=Math.floor(a)+0.5;b=a-persian_to_jd(475,1,1);c=Math.floor(b/1029983);d=mod(b,1029983);d==1029982?b=2820:(b=Math.floor(d/366),d=mod(d,366),b=Math.floor((2134*b+2816*d+2815)/1028522)+b+1);c=b+2820*c+474;c<=0&&c--;b=a-persian_to_jd(c,1,1)+1;b=b<=186?Math.ceil(b/31):Math.ceil((b-6)/30);a=a-persian_to_jd(c,b,1)+1;MYDAY=a;return[c,b,a]}function leap_gregorian(a){return a%4==0&&!(a%100==0&&a%400!=0)}function gregorian_to_jd(a,c,b){return GREGORIAN_EPOCH-1+365*(a-1)+Math.floor((a-1)/4)+-Math.floor((a-1)/100)+Math.floor((a-1)/400)+Math.floor((367*c-362)/12+(c<=2?0:leap_gregorian(a)?-1:-2)+b)}function ConvertEnglishNumsToPersian(a){for(var a=a.toString(),c=a.length,b="",d=0,d=0;d<c;++d)b+=String.fromCharCode(a.charCodeAt(d)>=48&&a.charCodeAt(d)<=57?a.charCodeAt(d)+1728:a.charCodeAt(d));return b};

var {ToggleButton} = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");

var panel = panels.Panel({
	width: 145,
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
	//badge: MYDAY,//No need badge for this version
	badgeColor: "#2CA5E0"
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