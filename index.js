/**
 * Main javascript file
 * @package Jalali Calendar
 * @version 1.1.0
 * @license GPL 2.0
 * @author Mostafa Ziasistani
 * @copyright 2016 Mostafa Ziasistani ( https://mostafazs.github.io )
 */


/**
 * Jalali Script
 * 
 */

JalaliDate = {
	g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
};

JalaliDate.jalaliToGregorian = function(j_y, j_m, j_d)
{
	j_y = parseInt(j_y);
	j_m = parseInt(j_m);
	j_d = parseInt(j_d);
	var jy = j_y-979;
	var jm = j_m-1;
	var jd = j_d-1;

	var j_day_no = 365*jy + parseInt(jy / 33)*8 + parseInt((jy%33+3) / 4);
	for (var i=0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

	j_day_no += jd;

	var g_day_no = j_day_no+79;

	var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
	g_day_no = g_day_no % 146097;

	var leap = true;
	if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */
	{
		g_day_no--;
		gy += 100*parseInt(g_day_no/  36524); /* 36524 = 365*100 + 100/4 - 100/100 */
		g_day_no = g_day_no % 36524;

		if (g_day_no >= 365)
			g_day_no++;
		else
			leap = false;
	}

	gy += 4*parseInt(g_day_no/ 1461); /* 1461 = 365*4 + 4/4 */
	g_day_no %= 1461;

	if (g_day_no >= 366) {
		leap = false;

		g_day_no--;
		gy += parseInt(g_day_no/ 365);
		g_day_no = g_day_no % 365;
	}

	for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
		g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
	var gm = i+1;
	var gd = g_day_no+1;

	return [gy, gm, gd];
}

JalaliDate.checkDate = function(j_y, j_m, j_d)
{
	return !(j_y < 0 || j_y > 32767 || j_m < 1 || j_m > 12 || j_d < 1 || j_d >
		(JalaliDate.j_days_in_month[j_m-1] + (j_m == 12 && !((j_y-979)%33%4))));
}

JalaliDate.gregorianToJalali = function(g_y, g_m, g_d)
{
	g_y = parseInt(g_y);
	g_m = parseInt(g_m);
	g_d = parseInt(g_d);
	var gy = g_y-1600;
	var gm = g_m-1;
	var gd = g_d-1;

	var g_day_no = 365*gy+parseInt((gy+3) / 4)-parseInt((gy+99)/100)+parseInt((gy+399)/400);

	for (var i=0; i < gm; ++i)
	g_day_no += JalaliDate.g_days_in_month[i];
	if (gm>1 && ((gy%4==0 && gy%100!=0) || (gy%400==0)))
	/* leap and after Feb */
	++g_day_no;
	g_day_no += gd;

	var j_day_no = g_day_no-79;

	var j_np = parseInt(j_day_no/ 12053);
	j_day_no %= 12053;

	var jy = 979+33*j_np+4*parseInt(j_day_no/1461);

	j_day_no %= 1461;

	if (j_day_no >= 366) {
		jy += parseInt((j_day_no-1)/ 365);
		j_day_no = (j_day_no-1)%365;
	}

	for (var i = 0; i < 11 && j_day_no >= JalaliDate.j_days_in_month[i]; ++i) {
		j_day_no -= JalaliDate.j_days_in_month[i];
	}
	var jm = i+1;
	var jd = j_day_no+1;


	return [jy, jm, jd];
}

Date.prototype.setJalaliFullYear = function(y, m, d) {
	var gd = this.getDate();
	var gm = this.getMonth();
	var gy = this.getFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	if (y < 100) y += 1300;
	j[0] = y;
	if (m != undefined) {
		if (m > 11) {
			j[0] += Math.floor(m / 12);
			m = m % 12;
		}
		j[1] = m + 1;
	}
	if (d != undefined) j[2] = d;
	var g = JalaliDate.jalaliToGregorian(j[0], j[1], j[2]);
	return this.setFullYear(g[0], g[1]-1, g[2]);
}

Date.prototype.setJalaliMonth = function(m, d) {
	var gd = this.getDate();
	var gm = this.getMonth();
	var gy = this.getFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	if (m > 11) {
		j[0] += math.floor(m / 12);
		m = m % 12;
	}
	j[1] = m+1;
	if (d != undefined) j[2] = d;
	var g = JalaliDate.jalaliToGregorian(j[0], j[1], j[2]);
	return this.setFullYear(g[0], g[1]-1, g[2]);
}

Date.prototype.setJalaliDate = function(d) {
	var gd = this.getDate();
	var gm = this.getMonth();
	var gy = this.getFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	j[2] = d;
	var g = JalaliDate.jalaliToGregorian(j[0], j[1], j[2]);
	return this.setFullYear(g[0], g[1]-1, g[2]);
}

Date.prototype.getJalaliFullYear = function() {
	var gd = this.getDate();
	var gm = this.getMonth();
	var gy = this.getFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	return j[0];
}

Date.prototype.getJalaliMonth = function() {
	var gd = this.getDate();
	var gm = this.getMonth();
	var gy = this.getFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	return j[1]-1;
}

Date.prototype.getJalaliDate = function() {
	var gd = this.getDate();
	var gm = this.getMonth();
	var gy = this.getFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	return j[2];
}

Date.prototype.getJalaliDay = function() {
	var day = this.getDay();
	day = (day + 1) % 7;
	return day;
}


/**
 * Jalali UTC functions 
 */

Date.prototype.setJalaliUTCFullYear = function(y, m, d) {
	var gd = this.getUTCDate();
	var gm = this.getUTCMonth();
	var gy = this.getUTCFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	if (y < 100) y += 1300;
	j[0] = y;
	if (m != undefined) {
		if (m > 11) {
			j[0] += Math.floor(m / 12);
			m = m % 12;
		}
		j[1] = m + 1;
	}
	if (d != undefined) j[2] = d;
	var g = JalaliDate.jalaliToGregorian(j[0], j[1], j[2]);
	return this.setUTCFullYear(g[0], g[1]-1, g[2]);
}

Date.prototype.setJalaliUTCMonth = function(m, d) {
	var gd = this.getUTCDate();
	var gm = this.getUTCMonth();
	var gy = this.getUTCFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	if (m > 11) {
		j[0] += math.floor(m / 12);
		m = m % 12;
	}
	j[1] = m+1;
	if (d != undefined) j[2] = d;
	var g = JalaliDate.jalaliToGregorian(j[0], j[1], j[2]);
	return this.setUTCFullYear(g[0], g[1]-1, g[2]);
}

Date.prototype.setJalaliUTCDate = function(d) {
	var gd = this.getUTCDate();
	var gm = this.getUTCMonth();
	var gy = this.getUTCFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	j[2] = d;
	var g = JalaliDate.jalaliToGregorian(j[0], j[1], j[2]);
	return this.setUTCFullYear(g[0], g[1]-1, g[2]);
}

Date.prototype.getJalaliUTCFullYear = function() {
	var gd = this.getUTCDate();
	var gm = this.getUTCMonth();
	var gy = this.getUTCFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	return j[0];
}

Date.prototype.getJalaliUTCMonth = function() {
	var gd = this.getUTCDate();
	var gm = this.getUTCMonth();
	var gy = this.getUTCFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	return j[1]-1;
}

Date.prototype.getJalaliUTCDate = function() {
	var gd = this.getUTCDate();
	var gm = this.getUTCMonth();
	var gy = this.getUTCFullYear();
	var j = JalaliDate.gregorianToJalali(gy, gm+1, gd);
	return j[2];
}

Date.prototype.getJalaliUTCDay = function() {
	var day = this.getUTCDay();
	day = (day + 1) % 7;
	return day;
}



var {ToggleButton} = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var timers = require("sdk/timers");

var panel = panels.Panel({
	width: 145,
	height: 60,
    contentURL: self.data.url("panel.html"),
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
}

function handleHide() {
    button.state('window', {checked: false});
}

panel.port.on('hide', function () {
    panel.hide();
});

//Set Intercal For Button Updates(60 Min)
timers.setInterval(UpdateButton, 3600000);


//Update Current Day On Button
function UpdateButton() {
    now = new Date();
    day= now.getDate();
	month = now.getMonth()+1;
	year= now.getYear();
	(year<1000)? (year += 1900):true;
	F = JalaliDate.gregorianToJalali(year,month,day)
	DesireDay = F[2];
    button.badge = DesireDay;
}

UpdateButton()