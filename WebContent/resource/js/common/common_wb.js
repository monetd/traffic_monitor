/**
 * 
 * @author Yongjea Lee
 * @version 1.0, 2017.01.13 공통으로 사용하는 함수들 모음
 * 
 */

/*
 * 날짜 별 '0'을 앞에 붙이기 위한 함수
 */
function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

/*
 * 입력값이 IP인지 확인
 */
function verifyIP(IPvalue) {
	errorString = "";
	theName = "IPaddress";

	var ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
	var ipArray = IPvalue.match(ipPattern);

	if (IPvalue == "0.0.0.0")
		errorString = errorString + theName + ': ' + IPvalue
				+ ' is a special IP address and cannot be used here.';
	else if (IPvalue == "255.255.255.255")
		errorString = errorString + theName + ': ' + IPvalue
				+ ' is a special IP address and cannot be used here.';
	if (ipArray == null)
		errorString = errorString + theName + ': ' + IPvalue
				+ ' is not a valid IP address.';
	else {
		for (i = 0; i < 4; i++) {
			thisSegment = ipArray[i];
			if (thisSegment > 255) {
				errorString = errorString + theName + ': ' + IPvalue
						+ ' is not a valid IP address.';
				i = 4;
			}
			if ((i == 0) && (thisSegment > 255)) {
				errorString = errorString + theName + ': ' + IPvalue
						+ ' is a special IP address and cannot be used here.';
				i = 4;
			}
		}
	}
	extensionLength = 3;
	if (errorString == "")
		return true;
	else
		return false;
}

/*
 * Trimmer
 */
function trim(value) {
	return value.replace(/^\s+|\s+$/g, "");
}

/*
 * 현재 시간
 */
function nowtime() {
	var d;
	var s;

	d = new Date();
	s = d.getFullYear() + '-' + leadingZeros(d.getMonth() + 1) + '-'
			+ leadingZeros(d.getDate(), 2) + ' '
			+ leadingZeros(d.getHours(), 2) + ':'
			+ leadingZeros(d.getMinutes(), 2) + ':'
			+ leadingZeros(d.getSeconds(), 2) + '.000';
	return s;
}

/* 
 * BPS 단위 변환
 */
function bpschange(bps) {
	if(bps>1000000000) {
		bps = bps /1000000000.0;
		bps = bps.toFixed(2);
		bps = bps+" Gbps";
	} else if(bps>1000000) {
		bps = bps /1000000.0;
		bps = bps.toFixed(2);
		bps = bps+" Mbps";
	} else if(bps>300000) {
		bps = bps /1000.0;
		bps = bps.toFixed(2);
		bps = bps+" Kbps";
	} else if(bps>1000) {
		bps = bps /1000.0;
		bps = bps.toFixed(2);
		bps = bps+" Kbps";
	} else
		bps = bps+" bps";

	return bps;
}

/* 
 * PPS 단위 변환
 */
function ppschange(pps) {
	if(pps>1000000) {
		pps = pps /1000000.0;
		pps = pps.toFixed(2);
		pps = pps+" Mpps";
	} else if(pps>300000) {
		pps = pps /1000.0;
		pps = pps.toFixed(2);
		pps = pps+" Kpps";
	} else if(pps>1000) {
		pps = pps /1000.0;
		pps = pps.toFixed(2);
		pps = pps+" Kpps";
	} else
		pps = pps+" pps";
	
	return pps;
}

/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경(DNS)
 */
function colorChange_dns(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'#00FF00\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'00FF00\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'00FF00\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'00FF00\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'00FF00\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'00FF00\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'00FF00\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}

/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


















/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경
 */
function colorChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}


/*
 * 단위 별 폰트 색상 변경 (Block만)
 */
function blockChange(str) {
	var newStr;

	if ( str.endsWith("bps") ) {
		// BPS
		if( str.endsWith("Gbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Gbps")) + "</font>Gbps";
		} else if( str.endsWith("Mbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mbps")) + "</font>Mbps";
		} else if( str.endsWith("Kbps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kbps")) + "</font>Kbps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" bps")) + "</font>bps";		
	} else {
		// PPS
		if( str.endsWith("Mpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Mpps")) + "</font>Mpps";
		} else if( str.endsWith("Kpps") ) {
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" Kpps")) + "</font>Kpps";
		} else
			newStr = "<font color=\'red\'>" + str.substring(0,str.indexOf(" pps")) + "</font>pps";	
	}
		
	return newStr;
}

/*
 * Sleep 기능
 */
function sleep(num)
{
	var now = new Date();
	var stop = now.getTime() + num;
	while(true){
		now = new Date();
		if(now.getTime()>stop) return;
	}
}

//배열 평균 구하기 함수
function average(array) {
  var sum = 0.0;

  for (var i = 0; i < array.length; i++)
    sum += array[i];

  return sum / array.length;
}
