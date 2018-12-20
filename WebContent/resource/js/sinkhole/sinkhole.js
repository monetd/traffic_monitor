/**
 * 
 * @author Yongjea Lee
 * @version 1.0, 2016.07.23 구현 1.1, 2016.07.25 해외싱크홀 추가 1.2, 2016.07.26 검색 기능
 *          추가(현재유입량 보기, 지난 싱크홀 유입량 검색) 2.0, 2017.01.13 Dynamic Web Project 포팅
 * 			2018.08.10	안양싱크홀 추가, (목동,일산 미수집)
 */

/* 수집 싱크홀 리스트 */
var sink = new Array('중앙-SKG', '해외-GKG', '구로-SKG099', '양재-SKG190', '수원-SKG017',
		'남인천-SKG139', '부산-SKM001', '원주-SKM218', '북대구-SKG250', '제주-SKM201',
		'남청주-SKG143', '대전-SKM019', '북광주-SKM003', '북전주-SKG132', '모란-SKG036',
		'혜화-SKG030', '안양-SKM064','목동-SKM105', '일산');

/* 수집 싱크홀 용량 */
var sinkCap = new Array(18);

sinkCap[0] = 400 * Math.pow(2, 30) // 중앙 싱크홀 용량 400G
sinkCap[1] = 80 * Math.pow(2, 30) // 해외 싱크홀 용량 80G
sinkCap[2] = 20 * Math.pow(2, 30) // 구로 싱크홀 용량 20G
sinkCap[3] = 10 * Math.pow(2, 30) // 양재 싱크홀 용량 10G
sinkCap[4] = 40 * Math.pow(2, 30) // 수원 싱크홀 용량 40G
sinkCap[5] = 5 * Math.pow(2, 30) // 남인천 싱크홀 용량 5G
sinkCap[6] = 10 * Math.pow(2, 30) // 부산 싱크홀 용량 10G
sinkCap[7] = 2 * Math.pow(2, 30) // 원주 싱크홀 용량 2G
sinkCap[8] = 40 * Math.pow(2, 30) // 북대구 싱크홀 용량 40G
sinkCap[9] = 2 * Math.pow(2, 30) // 제주 싱크홀 용량 2G
sinkCap[10] = 6 * Math.pow(2, 30) // 남청주 싱크홀 용량 6G
sinkCap[11] = 4 * Math.pow(2, 30) // 대전 싱크홀 용량 4G
sinkCap[12] = 40 * Math.pow(2, 30) // 북광주 싱크홀 용량 40G
sinkCap[13] = 10 * Math.pow(2, 30) // 북전주 싱크홀 용량 10G
sinkCap[14] = 20 * Math.pow(2, 30) // 모란 싱크홀 용량 20G
sinkCap[15] = 12 * Math.pow(2, 30) // 혜화 싱크홀 용량 12G
sinkCap[16] = 20 * Math.pow(2, 30) // 안양 싱크홀 용량 20G

/* 수집 싱크홀 갯수 */
var sinkNum = sink.length;
var sinkRawData = new Array(sinkNum);

/* 싱크홀 트래픽 초과 경보움 */
var audio = new Audio('../resource/sound/sinkhole/alert.mp3');
var playFlag = true;

/* 싱크홀 그래프 자동 Refresh 플래그 */
var sinkauto = new Array(sinkNum);

/* 필요한 Ext Library 명시 */
Ext.require([ 'Ext.window.Window', 'Ext.tab.*', 'Ext.toolbar.Spacer',
		'Ext.layout.container.Card', 'Ext.layout.container.Border',
		'Ext.chart.*' ]);

/* 페이지 로딩 시 */
$(document).ready(function () {
	$(".title_sec").html("<span>전국 싱크홀 트래픽</span>");
	
	var toggleDiv = $(".toggle_sec");
	var button = $("<span>경보음 끄기</span>");
	button.attr("id", "toggleButton");
	toggleDiv.prepend(button);
	
	
	button.click(function() {
		clickAudioToggle();
	});
	
	/* Extjs 메인함수 */
	Ext.onReady(function() {
		// 전체 싱크홀 갯수만큼 프레임 생성
		Ext.create('Ext.Panel', {
			id : 'dashboard',
			width : Ext.getBody().getViewSize().width,
			// height : 400 * sinkNum,
			height : 400 * 16,		// 임시 (16대)
			autoScroll : true,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			renderTo : Ext.getBody()
		});

		// 전체 싱크홀 갯수만큼 각각의 패널 생성
		/*
		 * for(var i=0; i<sinkNum; i++) { addSinkList(i); drawSinkList(i); }
		 */
		// 임시
		addSinkList(0);		// 중앙
		addSinkList(1);		// 해외
		addSinkList(2);		// 구로
		addSinkList(3);		// 양재
		addSinkList(4);		// 수원
		addSinkList(5);		// 남인천
		addSinkList(6);		// 부산
		addSinkList(7);		// 원주
		addSinkList(8);		// 북대구
		addSinkList(9);		// 제주
		addSinkList(10);	// 남청주
		addSinkList(11);	// 대전
		addSinkList(12);	// 북광주
		addSinkList(13);	// 북전주
		addSinkList(14);	// 모란
		addSinkList(15);	// 혜화
		addSinkList(16);	// 안양
		
		drawSinkList(0);	// 중앙
		drawSinkList(1);	// 해외
		drawSinkList(2);	// 구로
		drawSinkList(3);	// 양재
		drawSinkList(4);	// 수원
		drawSinkList(5);	// 남인천
		drawSinkList(6);	// 부산
		drawSinkList(7);	// 원주
		drawSinkList(8);	// 북대구
		drawSinkList(9);	// 제주
		drawSinkList(10);	// 남청주
		drawSinkList(11);	// 대전
		drawSinkList(12);	// 북광주
		drawSinkList(13);	// 북전주
		drawSinkList(14);	// 모란
		drawSinkList(15);	// 혜화
		drawSinkList(16);   // 안양
	});
});

/* 경보 버튼 토글 */
function clickAudioToggle() {
	if ( playFlag ) {
		audio.pause();
		$("#toggleButton").text("경보음 켜기");
		playFlag = false;
	} else {
		$("#toggleButton").text("경보음 끄기");
		audio.pause();
		playFlag = true;
	}
}

/* 싱크홀 패널 내용 생성 (대상 싱크홀, 트래픽 수집 시간) */
function addSinkList(sink_idx) {
	var item = Ext.getCmp('dashboard').add({
		title: sink[sink_idx] + ' [' + sinkCap[sink_idx]/Math.pow(2,30) + 'G]' + ' (' + '<span id=\'sinkdate' + sink_idx + '\'></span>' + ')',
		id: sink[sink_idx],
		cls: 'my-panel',
		layout: 'anchor',
		height: 400
	});
}

/* 싱크홀 트래픽을 DB로부터 불러온다. */
function getSinkTraffic(sink_idx) {
	sinkRawData[sink_idx] = Ext.create('Ext.data.JsonStore', {
		fields: [
			{name: 'date', type:'string'},
			{name: 'bps', type:'float'},
			{name: 'pps', type:'float'}
		],
		autoLoad: true,
		proxy: {
			type: 'ajax',
			url: 'getSinkData.do',
            extraParams: {
                "sink_idx": sink_idx
            },
			reader: {
				type: 'json',
				root: 'data',
				idProperty: 'sink'
			}
		},
		sorters: [
		{
			property : 'date',
			direction: 'ASC'
		}],
		listeners: {
			load: 
			{
				fn: function(data)
				{
					var bps = Number(sinkRawData[sink_idx].getAt(sinkRawData[sink_idx].count()-1).get('bps'));
					var pps = Number(sinkRawData[sink_idx].getAt(sinkRawData[sink_idx].count()-1).get('pps'));
					var db_dt = sinkRawData[sink_idx].getAt(sinkRawData[sink_idx].count()-1).get('date');
					var now = new Date();
					
					var dt  = db_dt.split(/\-|\s/)
					var dat = new Date(dt.slice(0,3).join('/')+' '+dt[3]);

					/*
					// 로컬 타임과 가장 최근 DB에 입력된 트래픽의 차이가 10분 이상일 때
					dif = now - dat
					
					if (dif > 60*1000) {
						collectError = "<br><font color=red size=4>트래픽 수집 에러!! 시스템을 점검하세요!</font>"
					} else
						collectError = ""
					*/
					// Ext.get("sinkdate" + sink_idx).update(sinkRawData[sink_idx].getAt(sinkRawData[sink_idx].count()-1).get('date') + collectError);
					Ext.get("sinkdate" + sink_idx).update(sinkRawData[sink_idx].getAt(sinkRawData[sink_idx].count()-1).get('date'));
					Ext.get("sinkbps" + sink_idx).update(colorChange(bpschange(bps)));
					Ext.get("sinkpps" + sink_idx).update(colorChange(ppschange(pps)));

					// 현재 BPS가 해당 싱크홀 용량의 75% 초과시
					if ( bps > sinkCap[sink_idx]*0.75) {
						if( playFlag ) {
							audio.play();
						}
						Ext.MessageBox.alert("싱크홀 용량 경보", sink[sink_idx] + "가 최대용량의 75%를 초과하였습니다!!");
						function hide_message() {
							Ext.defer(function() {
								Ext.MessageBox.hide();
								// audio.pause();
							}, 3000);
						}
						hide_message();
					}
				}
			}
		}
	});
}


/* 패널안에 싱크홀 그래프를 그린다. */
function drawSinkList(sink_idx) {
	getSinkTraffic(sink_idx);

	// 트래픽 바 생성
	Ext.getCmp(sink[sink_idx]).add({
		id: 'trafficBar'+sink_idx,
		frame: 'false',
		cls: 'trafficBarCls',
		html: '<span class=\'sinkbpsCls\' id=\'sinkbps' + sink_idx + '\'></span>' +
			'<span class=\'delim\'>/</span>' +
			'<span class=\'sinkppsCls\' id=\'sinkpps' + sink_idx + '\'></span>'
	});
		
	// 버튼 바 생성
	Ext.getCmp(sink[sink_idx]).add({
		id: 'ButtonBar'+sink_idx,
		cls: 'buttonBarCls',
		bbar: [{
			xtype: 'button',
			text: '현재 유입량 보기',
			handler: function() {	// 현재 유입량 보기 이벤트 핸들러
				clearInterval(sinkauto[sink_idx]);
				sinkRawData[sink_idx].load()
				sinkautostart(sink_idx);
			}
		},
		{
			xtype: 'button',
			text: '지난 싱크홀 유입량 검색',
			handler: function() {	// 지난 싱크홀 검색 이벤트 핸들러
				clearInterval(sinkauto[sink_idx]);

				Ext.create('Ext.Window', {
						title: '지난 싱크홀 유입량 검색 (' + sink[sink_idx] + ')',
						id: 'sinkholeform'+sink_idx,
						width: 550,
						bodyPadding: 5,
						modal: false,
						closable: false,
						buttons: [{
							text: '검색(입력시간 -5분 ~ +5분 사이)',
							id: 'sinkholesearchbutton'+sink_idx,
							handler: function(){
								if(Ext.getCmp("searchdate1"+sink_idx).isValid() && Ext.getCmp("searchdate2"+sink_idx).isValid()) {
									Ext.getCmp('sinkholesearchbutton'+sink_idx).disable();
									Ext.getCmp('sinkholecancelbutton'+sink_idx).disable();
									
									// 검색하고 뿌려주는 부분
									sinksearch(sink_idx);
									
									Ext.getCmp('sinkholeform'+sink_idx).close();
								} else {
									Ext.Msg.alert('오류', '데이터를 정확히 입력하여 주십시오');
								}
							}
						},{
							text: '취소',
							id: 'sinkholecancelbutton'+sink_idx,
							handler: function(){
								Ext.getCmp('sinkholeform'+sink_idx).close();
								sinkRawData[sink_idx].load()
								sinkautostart(sink_idx);
							}
						}],
						fieldDefaults: {
							labelAlign: 'left',
							anchor: '100%'
						},
						defaults:{
							width:500,
							labelWidth: 60
						},
						items: [{
							xtype: 'datefield',
							format: 'Y-m-d',
							name: 'searchdate1'+sink_idx,
							id: 'searchdate1'+sink_idx,
							fieldLabel: '검색일시',
							value: new Date(),
							allowBlank: false
							},{
							xtype: 'textfield',
							name: 'searchdate2'+sink_idx,
							id: 'searchdate2'+sink_idx,
							fieldLabel: '검색시간',
							emptyText: '시:분 형식으로 정확히 입력(예- 17:58)',
							validator: function(){
								var a = this.getValue();
								var b = a.split(":");
								if(b[0]!=null && b[1]!=null && b[0].length>1 && b[1].length>1 &&b[2]==null) {
									if(Number(b[0])<24 && Number(b[1])<60) {
											return true;		
									}
								}
							return "시:분 형식으로 정확히 입력하세요";
						},
						allowBlank: false
					}]
				}).show();
			}
		}]
	});

	// 그래프 생성
	Ext.getCmp(sink[sink_idx]).add({
		xtype: 'chart',
		id: 'chartCmp' + sink[sink_idx],
		width: Ext.getCmp(sink[sink_idx]).getWidth()-40,
		height: Ext.getCmp(sink[sink_idx]).getHeight()-130,
		shadow: true,
		store: sinkRawData[sink_idx],
		legend: {
			position: 'bottom'
		},
		margin: '10 10 10 10',
		axes: [{
			type: 'Numeric',
			position: 'left',
			fields: ['bps'],
			minimum: 0,
			label: {
				renderer: function(name)
				{
					return bpschange(name);
				},
				font: '11px Arial'
				},
				title: false
            },
            {
            	type: 'Numeric',
                position: 'right',
                fields: ['pps'],
				minimum: 0,
				adjustMaximumByMajorUnit: true,
                label: {
                    renderer: function(name)
				{
					return ppschange(name);
				},
				font: '11px Arial'
			},
			title: false
		}],
            series: [{
                type: 'line',
                smooth: true,
                axis: 'left',
                xField: 'date',
                yField: 'bps',
                highlight: {
                    size: 7,
                    radius: 7
                },
				tips: {
				  trackMouse: true,
				  width: 200,
				  height: 40,
				  renderer: function(storeItem, item) {
					var bps = storeItem.get('bps');
					this.setTitle('<center>'+storeItem.get('date') + '<br>' + colorChange(bpschange(bps))+'</center>');
				  }
				},
				style: {
                    fill: '#38B8BF',
                    stroke: '#38B8BF',
					opacity: 0.2
				},
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0,
                    fill: '#38B8BF',
                    stroke: '#38B8BF'
                }
            },{
                type: 'line',
                smooth: true,
				fill: true,
                axis: 'right',
                xField: 'date',
                yField: 'pps',
                highlight: {
                    size: 7,
                    radius: 7
                },
				tips: {
				  trackMouse: true,
				  width: 200,
				  height: 40,
				  renderer: function(storeItem, item) {
					var pps = storeItem.get('pps');
					this.setTitle('<center>'+storeItem.get('date') + '<br>' + colorChange(ppschange(pps))+'</center>');
				  }
				}
            }]
		});

		sinkautostart(sink_idx);
	}

	
/* 싱크홀 트래픽 검색 */
function sinksearch(sink_idx) {
	var time = trim(Ext.getCmp('searchdate1'+sink_idx).getRawValue()) +
			" " +
			trim(Ext.getCmp('searchdate2'+sink_idx).getRawValue()) + 
			":00.000";
	
	Ext.Ajax.request({
		url: 'searchSinkData.do',
		method: 'GET',
		scope: this,
		params: {
			sink_idx: sink_idx,
			time: time
		},
		success: function(response){
			var text = Ext.JSON.decode(response.responseText);
				if (text.data[0]!=null) {
					sinkRawData[sink_idx].loadRawData(text);
					Ext.get("sinkdate"+sink_idx).update("검색결과: "+	sinkRawData[sink_idx].getAt(0).get('date')+" ~ "+sinkRawData[sink_idx].getAt(sinkRawData[sink_idx].count()-1).get('date'));
					Ext.get("sinkbps"+sink_idx).update("Max: "+ colorChange(bpschange(sinkRawData[sink_idx].max('bps'))));
					Ext.get("sinkpps"+sink_idx).update(colorChange(ppschange(sinkRawData[sink_idx].max('pps'))));
				} else {
					sinkRawData[sink_idx].load();
					sinkautostart(sink_idx);
					Ext.Msg.alert('오류','해당 기간 싱크홀 데이터가 없습니다.');
				}
		},
		failure: function(response, opts) {
			sinkRawData[sink_idx].load();
			sinkautostart(sink_idx);
			Ext.Msg.alert('오류','데이터 로딩이 실패하였습니다.<br>연결상태를 확인해주세요');				
		}
	});
}


/* 페이지 load 이후, 10초 간격으로 싱크홀 트래픽을 새로 불러온다. */
function sinkautostart(sink_idx) {
	sinkauto[sink_idx] = setInterval(function() {
		sinkRawData[sink_idx].load();
	}, 10000);
}

/* 윈도우 리사이징시 브라우저에 맞게 가로, 세로 길이 새로고침 */
Ext.EventManager.onWindowResize(function() {
	Ext.getCmp('dashboard').setWidth(Ext.getBody().getViewSize().width);
	/*
	 * for(var i=0; i<sinkNum; i++) { Ext.getCmp('chartCmp' +
	 * sink[sink_idx]).setWidth(Ext.getBody().getViewSize().width - 40); }
	 */
	// 임시
	Ext.getCmp('chartCmp' + sink[0]).setWidth(Ext.getBody().getViewSize().width - 40);		// 해외
	Ext.getCmp('chartCmp' + sink[1]).setWidth(Ext.getBody().getViewSize().width - 40);		// 중앙
	Ext.getCmp('chartCmp' + sink[2]).setWidth(Ext.getBody().getViewSize().width - 40);		// 구로
	Ext.getCmp('chartCmp' + sink[3]).setWidth(Ext.getBody().getViewSize().width - 40);		// 양재
	Ext.getCmp('chartCmp' + sink[4]).setWidth(Ext.getBody().getViewSize().width - 40);		// 수원
	Ext.getCmp('chartCmp' + sink[5]).setWidth(Ext.getBody().getViewSize().width - 40);		// 남인천
	Ext.getCmp('chartCmp' + sink[6]).setWidth(Ext.getBody().getViewSize().width - 40);		// 부산
	Ext.getCmp('chartCmp' + sink[7]).setWidth(Ext.getBody().getViewSize().width - 40);		// 원주
	Ext.getCmp('chartCmp' + sink[8]).setWidth(Ext.getBody().getViewSize().width - 40);		// 북대구
	Ext.getCmp('chartCmp' + sink[9]).setWidth(Ext.getBody().getViewSize().width - 40);		// 제주
	Ext.getCmp('chartCmp' + sink[10]).setWidth(Ext.getBody().getViewSize().width - 40);		// 남청주
	Ext.getCmp('chartCmp' + sink[11]).setWidth(Ext.getBody().getViewSize().width - 40);		// 대전
	Ext.getCmp('chartCmp' + sink[12]).setWidth(Ext.getBody().getViewSize().width - 40);		// 북광주
	Ext.getCmp('chartCmp' + sink[13]).setWidth(Ext.getBody().getViewSize().width - 40);		// 북전주
	Ext.getCmp('chartCmp' + sink[14]).setWidth(Ext.getBody().getViewSize().width - 40);		// 모란
	Ext.getCmp('chartCmp' + sink[15]).setWidth(Ext.getBody().getViewSize().width - 40);		// 혜화
	Ext.getCmp('chartCmp' + sink[16]).setWidth(Ext.getBody().getViewSize().width - 40);		// 안양
});
