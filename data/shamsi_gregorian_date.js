	/**
	 * Get shamsi and gregorian translate persian date and show them on page
	 * 
	 * @package Jalali Calendar
	 */
	
	/**
	 * Get shamsi date
	 * 
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
	var WriteDate = " "+week[d]+" "+day+" "+months[month-1]+" "+ year;

	//Output results
	var show_date_shamsi = document.getElementById("show_date_shamsi");
	var TextNODE = document.createTextNode(WriteDate);
	show_date_shamsi.appendChild(TextNODE);
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
