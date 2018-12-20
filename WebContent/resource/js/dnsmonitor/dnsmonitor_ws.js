var ipsList = new Array('전국', '중앙', '프리미엄', 'KIX', '남인천', '수원', '광주', '북대구',
		'서대전', '남청주', '모란', '목동', '미아', '신제주', '신촌', '원주', '일산', '전주', '행당',
		'혜화', '영동', '구로', '서부산', '안양');

var ipsNum = ipsList.length;
var chartList = new Array(ipsNum);

var initFlagList = new Array(ipsNum);
var timeFlag = new Array(ipsNum);

var alert_dns = new Audio('../resource/sound/dnsmonitor/alert_dns.mp3');

var speakerFlag = true;
var totalSearchFlag = false;

for (var i = 0; i < ipsNum; i++)
	initFlagList[i] = true;

Ext.require([ 'Ext.window.Window', 'Ext.tab.*', 'Ext.toolbar.Spacer',
		'Ext.layout.container.Card', 'Ext.layout.container.Border',
		'Ext.chart.*' ]);

$(document)
		.ready(
				function() {
					Highcharts.setOptions({
						global : {
							useUTC : false
						}
					});

					$(".title_sec").html("<span>전국 DNS 트래픽</span>");

					$(".toggle_sec")
							.html(
									"<img id=\"speaker_on\" src=\"../resource/image/dnsmonitor/speaker.png\"/>");
					var speaker_icon = $("#speaker_on");
					speaker_icon.attr("class", "speaker");
					speaker_icon
							.click(function() {
								if (speakerFlag) {
									speaker_icon.attr('src', "../resource/image/dnsmonitor/speaker_mute.png");
									// alert_in.pause();
									// alert_out.pause();
									// alert_drop.pause();
									speakerFlag = false;
								} else {
									speaker_icon
											.attr('src',"../resource/image/dnsmonitor/speaker.png");
									speakerFlag = true;
								}
							});

					var name = new Array(ipsNum);
					var traffic = new Array(ipsNum);
					var button = new Array(ipsNum);
					var container = new Array(ipsNum);

					for (var i = 0; i < ipsNum; i++) {
						if ( i == 14 ) continue;
						traffic = $("<div>");
						common = $("<div>");
						name = $("<span>");
						button = $("<span>");
						container = $("<div>");

						traffic.attr("id", "traffic" + i);
						traffic.attr("class", "traffic_sec");

						common.attr("id", "common" + i);
						common.attr("class", "common_sec");

						name.attr("id", "name" + i);
						name.attr("class", "name_sec");

						button.attr("id", "button" + i);
						button.attr("class", "button_sec");

						container.attr("id", "container" + i);
						container.attr("class", "container_sec");

						// $("#graph" + i).append(name);
						$("#graph" + i).append(traffic);
						$("#graph" + i).append(common);
						$("#common" + i).append(name);
						$("#common" + i).append(button);
						$("#graph" + i).append(container);
						if ( i == 14 ) continue;
						addIPSGraph(i);
					}

					for (var i = 0; i < ipsNum; i++) {
						if ( i == 14 ) continue;
						requestData(i);
					}
				});

function addIPSGraph(ips_idx) {
	var containerNum = 'container' + ips_idx;
	var IPSname = $('#name' + ips_idx);

	// IPSname.html('<span>[' + ipsList[ips_idx] + ']</span>');

	chartList[ips_idx] = Highcharts.chart(containerNum,
			{
				chart : {
					backgroundColor: '#000000',
					type : 'line',
					// animation: Highcharts.svg, // don't animate in old IE
					alignTicks : false
				},
				title : {
					text : ''
				},
				xAxis : {
					type : 'datetime',
					dateTimeLabelFormats : {
						second : '%H:%M:%S'
					},
					tickPixelInterval : 50,
					labels: {
						style: {
							color: 'white'
						}
					}
				},
				yAxis : {
					labels : {
						formatter : function() {
							var maxElement = this.axis.max;

							if (maxElement >= 1000000000) {
								return (this.value / 1000000000.0).toFixed(2)
										+ " Gpps";
							} else if (maxElement >= 1000000) {
								return (this.value / 1000000.0).toFixed(2)
										+ " Mpps";
							} else if (maxElement >= 1000) {
								return (this.value / 1000.0).toFixed(2)
										+ " Kpps";
							} else {
								return (this.value) + " pps";
							}
						},
						style : {
							// color : Highcharts.getOptions().colors[1]
							color : 'white'
						}
					},
					title : {
						text : 'PPS'
					},
					plotLines : [ {
						value : 0,
						width : 1,
						color : '#808080'
					} ]
				},
				tooltip : {
					backgroundColor : '#FCFFC5',
					borderColor : 'black',
					borderRadius : 10,
					borderWidth : 3,
					formatter : function() {
						return '<b>'
								+ this.series.name
								+ '</b><br/>'
								+ Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',
										this.x) + '<br/>' + ppschange(this.y);
					}
				},
				legend : {
					layout : 'horizontal',
					verticalAlign : 'bottom'
				},
				navigation : {
					buttonOptions : {
						theme : {
							style : {
								color : '#039',
								textDecoration : 'underline'
							}
						}
					}
				},
				exporting : 'disable',
				series : [ {
					name : 'pps(in)',
					type : 'area',
					// color : Highcharts.getOptions().colors[0],
					color : '#00FF00',
					data : []
				}, {
					name : 'pps(out)',
					type : 'line',
					color : '#000000',
					data : []
				}, {
					name : 'pps(in)_drop',
					type : 'area',
					color : '#ff0000',
					data : [],
					visible : true
				}, {
					name : 'pps(out)_drop',
					type : 'line',
					color : Highcharts.getOptions().colors[6],
					data : [],
					visible : false
				} ],
			});
}

// 그래프 처음 로딩 시
function requestData(ips_idx) {
	var trafficBar = $('#traffic' + ips_idx);
	var buttonBar = $('#button' + ips_idx);
	var IPSname = $('#name' + ips_idx);

	// IPSname.html('<span>[' + ipsList[ips_idx] + ']</span>');

	if (initFlagList[ips_idx]) {
		if (ips_idx == 0) {
			buttonBar
					.append("<button id=\"initBtn\" class=\"button\"><span id=\"current_bt\">현재 유입량 보기</span></button>");

			$("#initBtn").click(function() {
				for (var i = 0; i < ipsNum; i++) {
					clearTimeout(timeFlag[i]);
					requestData(i);
				}
			});

		} else {
			buttonBar
					.append("<button class=\"button\" onclick=\"clearTimeout(timeFlag["
							+ ips_idx
							+ "]); requestData("
							+ ips_idx
							+ ");\"><span id=\"current_bt\">현재 유입량 보기</span></button>");
		}
		buttonBar.append("<button class=\"button\" onclick=\"search(" + ips_idx
				+ ");\"><span id=\"search_bt\">지난 DNS 유입량 검색</span></button>");

		initFlagList[ips_idx] = false;
	}
	$.ajax({
		url : 'getDnsData.do',
		type : 'GET',
		data : {
			'ips_idx' : ips_idx
		},
		dataType : 'json',
		success : function(respdata) {
			var len = Object.keys(respdata.data).length;
			var trafficInfo1;
			var trafficInfo2;
			var trafficInfo3;
			var trafficInfo4;

			var total_ppsin = new Array();
			var total_ppsout = new Array();
			var total_ppsin_drop = new Array();
			var total_ppsout_drop = new Array();

			// set data
			for (var i = 0; i < len; i++) {

				trafficInfo1 = [ new Date(respdata.data[i].date).getTime(),
						respdata.data[i].sumpps_in ];
				trafficInfo2 = [ new Date(respdata.data[i].date).getTime(),
						respdata.data[i].sumpps_out ];
				trafficInfo3 = [ new Date(respdata.data[i].date).getTime(),
						respdata.data[i].sumpps_in_drop ];
				trafficInfo4 = [ new Date(respdata.data[i].date).getTime(),
						respdata.data[i].sumpps_out_drop ];

				total_ppsin.push(trafficInfo1);
				total_ppsout.push(trafficInfo2);
				total_ppsin_drop.push(trafficInfo3);
				total_ppsout_drop.push(trafficInfo4);
			}

			IPSname.html('<span>' + ipsList[ips_idx] + ' ('
					+ respdata.data[len - 1].date + ')</span>');

			trafficBar.html("In "
					+ colorChange_dns(ppschange(total_ppsin[len - 1][1]))
					+ " / Out "
					+ colorChange_dns(ppschange(total_ppsout[len - 1][1]))
					+ " / Block "
					+ blockChange(ppschange(total_ppsin_drop[len - 1][1])));

			chartList[ips_idx].series[0].setData(total_ppsin);
			chartList[ips_idx].series[1].setData(total_ppsout);
			chartList[ips_idx].series[2].setData(total_ppsin_drop);
			chartList[ips_idx].series[3].setData(total_ppsout_drop);

			chartList[ips_idx].redraw();
			chartList[ips_idx].redraw();
			chartList[ips_idx].redraw();
			chartList[ips_idx].redraw();

			alertMessage(0)
		},
		cache : false
	});

	if (ips_idx == 0) {
		timeFlag[ips_idx] = setTimeout(requestData, 61000, ips_idx);
	} else {
		timeFlag[ips_idx] = setTimeout(requestData, 17000, ips_idx);
	}

}

function alertMessage(ips_idx) {
	var len = Object.keys(chartList[ips_idx].series[0].data).length;
	var recent_sumpps_in = chartList[ips_idx].series[0].data[len - 1].y;
	var recent_sumpps_out = chartList[ips_idx].series[1].data[len - 1].y;

	/* PPS_out 트래픽이 PPS_in 트래픽 보다 클 경우 */
	if ( recent_sumpps_out > recent_sumpps_in ) {
		if ( speakerFlag )
		{
			alert_dns.loop = false;
			alert_dns.play();

			Ext.MessageBox.alert("전국 DNS 트래픽 경보", "DNS 트래픽을 확인하여 주세요.");
			function hide_message() {
				Ext.defer(function() {
					Ext.MessageBox.hide();
				}, 5000);
			}
			hide_message();
		}
	} 
}

function search(ips_idx) {
	Ext
			.create(
					'Ext.Window',
					{
						title : '지난 DNS-IPS 유입량 검색 (' + ipsList[ips_idx] + ')',
						id : 'ipsSearchForm' + ips_idx,
						width : 550,
						bodyPadding : 5,
						closable : false,
						buttons : [
								{
									text : '검색(입력시간 -2분 ~ +2분 사이) ※ 총합 그래프는 -5 ~ +5',
									id : 'ipssearchbutton' + ips_idx,
									handler : function() {
										if (Ext.getCmp("searchdate1" + ips_idx)
												.isValid()
												&& Ext
														.getCmp(
																"searchdate2"
																		+ ips_idx)
														.isValid()) {
											Ext
													.getCmp(
															'ipssearchbutton'
																	+ ips_idx)
													.disable();
											Ext
													.getCmp(
															'ipscancelbutton'
																	+ ips_idx)
													.disable();

											// 총합 IPS일 경우 지역것까지 모두 검색 후 정렬
											if (ips_idx == 0) {
												totalSearchFlag = true;
												for (var i = 0; i < ipsNum; i++) {
													IPSSearch(i);
													clearTimeout(timeFlag[i]);
												}
											} else {
												IPSSearch(ips_idx);
												clearTimeout(timeFlag[ips_idx]);
											}

											Ext.getCmp(
													'ipsSearchForm' + ips_idx)
													.close();
										} else {
											Ext.Msg.alert('오류',
													'데이터를 정확히 입력하여 주십시오');
										}
									}
								},
								{
									text : '취소',
									id : 'ipscancelbutton' + ips_idx,
									handler : function() {
										Ext.getCmp('ipsSearchForm' + ips_idx)
												.close();
									}
								} ],
						fieldDefaults : {
							labelAlign : 'left',
							anchor : '100%'
						},
						defaults : {
							width : 500,
							labelWidth : 60
						},
						items : [
								{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'searchdate1' + ips_idx,
									id : 'searchdate1' + ips_idx,
									fieldLabel : '검색일시',
									value : new Date(),
									allowBlank : false
								},
								{
									xtype : 'textfield',
									name : 'searchdate2' + ips_idx,
									id : 'searchdate2' + ips_idx,
									fieldLabel : '검색시간',
									emptyText : '시:분 형식으로 정확히 입력(예- 17:58)',
									validator : function() {
										var a = this.getValue();
										var b = a.split(":");
										if (b[0] != null && b[1] != null
												&& b[0].length > 1
												&& b[1].length > 1
												&& b[2] == null) {
											if (Number(b[0]) < 24
													&& Number(b[1]) < 60) {
												return true;
											}
										}

										return "시:분 형식으로 정확히 입력하세요";
									},
									allowBlank : false
								} ]
					}).show();
}

function IPSSearch(ips_idx) {
	var trafficBar = $('#traffic' + ips_idx);
	var IPSname = $('#name' + ips_idx);

	if (totalSearchFlag) {
		time = Ext.getCmp('searchdate10').getRawValue().trim() + " "
				+ Ext.getCmp('searchdate20').getRawValue().trim() + ":00.000";
	} else {
		time = Ext.getCmp('searchdate1' + ips_idx).getRawValue().trim() + " "
				+ Ext.getCmp('searchdate2' + ips_idx).getRawValue().trim()
				+ ":00.000";
	}

	$.ajax({
		url : 'searchDnsData.do',
		type : 'GET',
		data : {
			'ips_idx' : ips_idx,
			'time' : time,
		},
		dataType : 'json',
		success : function(respdata) {
			if (!$.isEmptyObject(respdata)) {
				var len = Object.keys(respdata.data).length;
				var trafficInfo1;
				var trafficInfo2;
				var trafficInfo3;
				var trafficInfo4;

				var total_ppsin = new Array();
				var total_ppsout = new Array();
				var total_ppsin_drop = new Array();
				var total_ppsout_drop = new Array();

				// set data
				for (var i = 0; i < len; i++) {
					trafficInfo1 = [ new Date(respdata.data[i].date).getTime(),
							respdata.data[i].sumpps_in ];
					trafficInfo2 = [ new Date(respdata.data[i].date).getTime(),
							respdata.data[i].sumpps_out ];
					trafficInfo3 = [ new Date(respdata.data[i].date).getTime(),
							respdata.data[i].sumpps_in_drop ];
					trafficInfo4 = [ new Date(respdata.data[i].date).getTime(),
							respdata.data[i].sumpps_out_drop ];

					total_ppsin.push(trafficInfo1);
					total_ppsout.push(trafficInfo2);
					total_ppsin_drop.push(trafficInfo3);
					total_ppsout_drop.push(trafficInfo4);
				}

				trafficBar
						.html("In : "
								+ colorChange(ppschange(total_ppsin[Math
										.floor(len / 2)][1]))
								+ " / Out : "
								+ colorChange(ppschange(total_ppsout[Math
										.floor(len / 2)][1]))
								+ " / Block : "
								+ colorChange(ppschange(total_ppsin_drop[Math
										.floor(len / 2)][1])));

				IPSname.html('<span>' + ipsList[ips_idx] + ' ('
						+ respdata.data[len - 1].date + ')</span>');

				chartList[ips_idx].series[0].setData(total_ppsin);
				chartList[ips_idx].series[1].setData(total_ppsout);
				chartList[ips_idx].series[2].setData(total_ppsin_drop);
				chartList[ips_idx].series[3].setData(total_ppsout_drop);

				chartList[ips_idx].redraw();
				chartList[ips_idx].redraw();
				chartList[ips_idx].redraw();
				chartList[ips_idx].redraw();
			} else {
				Ext.Msg.alert('오류', '해당 기간 IPS 데이터가 없습니다.');
			}
		},
		cache : false
	});
}
