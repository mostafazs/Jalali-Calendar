	/**
	 * Get shamsi and gregorian translate persian date and show them on page
	 * 
	 * @package Jalali Calendar
	 */
	
	/**
	 * Get shamsi date
	 * @deprecate {issue on case 3: day+=9 & other places for new year(part of code not work)}
	 * @since 0.1
	 */
	
	week= new Array("يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنج شنبه","جمعه","شنبه")
	
	months = new Array("فروردين","ارديبهشت","خرداد","تير","مرداد","شهريور","مهر","آبان","آذر","دي","بهمن","اسفند");
	a = new Date();
	d= a.getDay();
	day= a.getDate();
	month = a.getMonth()+1;
	year= a.getYear();
	year = (year== 0)?2000:year;
	(year<1000)? (year += 1900):true;
	year -= ( (month < 3) || ((month == 3) && (day < 21)) )? 622:621;
	switch (month) {
	case 1: (day<21)? (month=10, day+=10):(month=11, day-=20); break;
	case 2: (day<20)? (month=11, day+=11):(month=12, day-=19); break;
	case 3: (day<21)? (month=12, day+=9):(month=1, day-=20); break;
	case 4: (day<21)? (month=1, day+=11):(month=2, day-=20); break;
	case 5:
	case 6: (day<22)? (month-=3, day+=10):(month-=2, day-=21); break;
	case 7:
	case 8:
	case 9: (day<23)? (month-=3, day+=9):(month-=2, day-=22); break;
	case 10:(day<23)? (month=7, day+=8):(month=8, day-=22); break;
	case 11:
	case 12:(day<22)? (month-=3, day+=9):(month-=2, day-=21); break;
	default: break;
	}
	//var WriteDate = " "+week[d]+" "+day+" "+months[month-1]+" "+ year;//Not use
	var WriteDayName = "" + week[d] + " ";
	//Output results
	var show_day_shamsi = document.getElementById("show_day_shamsi");
	var TextNODE = document.createTextNode(WriteDayName);
	show_day_shamsi.appendChild(TextNODE);
	/**
	 * Get shamsi date ( new function )
	 * 
	 * @since 1.0.1
	 * @see depracated previous code
	 * @todo this function have some duplicated variable entry names with older function (issue one some pages)
	 * @todo get direct access for current day
	 */	
	if(typeof JCD==="undefined")var JCD={};if(typeof A$!=="function")var A$=function(a){return document.getElementById(a)};if(typeof cTN!=="function")var cTN=function(a){return document.createTextNode(a)};JCD.JDate=function(a){var c=A$(a),b=new Date,b=jd_to_persian(gregorian_to_jd(b.getFullYear(),b.getMonth()+1,b.getDate())),b=ConvertEnglishNumsToPersian(b[2].toString()+" "+PERSIAN_MONTH_NAMES[b[1]-1]+" "+b[0].toString());for(setTimeout(function(){JCD.JDate(a)},6E4);c.firstChild;)c.removeChild(c.firstChild);c.appendChild(cTN(b))};var GREGORIAN_EPOCH=1721425.5,PERSIAN_EPOCH=1948320.5,PERSIAN_MONTH_NAMES="\u0641\u0631\u0648\u0631\u062f\u06cc\u0646,\u0627\u0631\u062f\u06cc\u0628\u0647\u0634\u062a,\u062e\u0631\u062f\u0627\u062f,\u062a\u06cc\u0631,\u0645\u0631\u062f\u0627\u062f,\u0634\u0647\u0631\u06cc\u0648\u0631,\u0645\u0647\u0631,\u0622\u0628\u0627\u0646,\u0622\u0630\u0631,\u062f\u06cc,\u0628\u0647\u0645\u0646,\u0627\u0633\u0641\u0646\u062f".split(",");function mod(a,c){return a-c*Math.floor(a/c)}function leap_persian(a){return((a-(a>0?474:473))%2820+512)*682%2816<682}function persian_to_jd(a,c,b){var d;a-=a>=0?474:473;d=474+mod(a,2820);return b+(c<=7?(c-1)*31:(c-1)*30+6)+Math.floor((d*682-110)/2816)+(d-1)*365+Math.floor(a/2820)*1029983+(PERSIAN_EPOCH-1)}function jd_to_persian(a){var c,b,d,a=Math.floor(a)+0.5;b=a-persian_to_jd(475,1,1);c=Math.floor(b/1029983);d=mod(b,1029983);d==1029982?b=2820:(b=Math.floor(d/366),d=mod(d,366),b=Math.floor((2134*b+2816*d+2815)/1028522)+b+1);c=b+2820*c+474;c<=0&&c--;b=a-persian_to_jd(c,1,1)+1;b=b<=186?Math.ceil(b/31):Math.ceil((b-6)/30);a=a-persian_to_jd(c,b,1)+1;return[c,b,a]}function leap_gregorian(a){return a%4==0&&!(a%100==0&&a%400!=0)}function gregorian_to_jd(a,c,b){return GREGORIAN_EPOCH-1+365*(a-1)+Math.floor((a-1)/4)+-Math.floor((a-1)/100)+Math.floor((a-1)/400)+Math.floor((367*c-362)/12+(c<=2?0:leap_gregorian(a)?-1:-2)+b)}function ConvertEnglishNumsToPersian(a){for(var a=a.toString(),c=a.length,b="",d=0,d=0;d<c;++d)b+=String.fromCharCode(a.charCodeAt(d)>=48&&a.charCodeAt(d)<=57?a.charCodeAt(d)+1728:a.charCodeAt(d));return b};
	

	/**
	 * Get persian translate for georgian date
	 * 
	 * @since 1.0.0
	 * @param lang
	 * @returns ?
	 */
	Date.prototype.getMonthName = function(lang) {
	    lang = lang && (lang in Date.locale) ? lang : 'en';
	    return Date.locale[lang].month_names[this.getMonth()];
	};

	Date.prototype.getDayName = function(lang) {
	    lang = lang && (lang in Date.locale) ? lang : 'en';
	    return Date.locale[lang].day_names[this.getDay()];
	};

	Date.locale = {
	    en: {
	       month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	       day_names: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	    },
	    fa: {
	        month_names: ["ژانویه", "فوریه", "مارس", "آپریل", "می", "ژوئن",
	                      "ژولای", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"
	                      ],
	        day_names: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه']
	     }
	};
	//Example
	//var d = new Date();
	//alert(d.getMonthName('fa'))
	//alert(d.getDayName('fa'))

	//Output results
	var daayy = new Date();
	var WriteDate1 = " "+daayy.getDayName('fa') + " " + daayy.getDate() +" " + daayy.getMonthName('fa') + " " + daayy.getFullYear();

	//Output results
	var show_date_gregorian = document.getElementById("show_date_gregorian");
	var TextNODE1 = document.createTextNode(WriteDate1);
	show_date_gregorian.appendChild(TextNODE1);




	/**
	 * Old gregorian script
	 * 
	 * @deprecated
	 */
	//var monthNames = ["ژانویه", "فوریه", "مارس", "آپریل", "می", "ژوئن",
	  //"ژولای", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"
	//];
	//var dayNames = ["یکشنبه", "دوشنبه", "سه شنبه", "چهار شنبه", "پنجشنبه", "جمعه","شنبه"];
	//Example
	//var d = new Date();
	//console.log(d);
	//console.log(d.getMonth());
	//console.log(d.getDay());
	//document.write("The current month is " + monthNames[d.getMonth()]);
	//document.write("The current day is " + dayNames[d.getDay()]);
