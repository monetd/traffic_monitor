package sinkhole.service;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;


public class SinkDAO {

	private Connection conn = null;
	private String jdbcDriver = "jdbc:apache:commons:dbcp:sinkdbcp";

	/*
	 * SinkDAO 생성자
	 */
	public SinkDAO() {
		// this.conn = conn;
	}
	
	/*
	 * 싱크홀 트래픽을 DB로부터 수집 (Total 40)
	 */
	public List<SinkDTO> getSinkData(int sink_idx) throws SQLException {
		List<SinkDTO> lists = new ArrayList<SinkDTO>();
		SinkDTO dto = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String queryStr = null;
		
		try {
			queryStr = "select TOP 40 * ";
			queryStr += "from " + findSink(sink_idx) + " ";
			queryStr += "order by date DESC";
			
			conn = DriverManager.getConnection(jdbcDriver);
					
			pstmt = conn.prepareStatement(queryStr,ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);

			rs = pstmt.executeQuery();
			
			while (rs.next()) {
				dto = new SinkDTO();
				dto.setDate(rs.getString("date").substring(0,19));
				dto.setBps(rs.getString("bps"));
				dto.setPps(rs.getString("pps"));
				lists.add(dto);
			};
			
		} catch (SQLException ex) {
			ex.printStackTrace();
		} finally {
			if (rs != null) rs.close();
			if (pstmt != null) pstmt.close();
			if (conn != null) conn.close();
		}
		
		return lists;
	}
	
	/*
	 * 싱크홀 트래픽을 DB로부터 검색 (Total 40)
	 */
	public List<SinkDTO> searchSinkData(int sink_idx, String time) throws SQLException {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		Date blockdate = null;
		long blockdate_long, blockdatebefore_long, blockdateafter_long;
		String blockdatebefore_st, blockdateafter_st;
		
		try {
			blockdate = sdf.parse(time);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		blockdate_long = blockdate.getTime();
		blockdatebefore_long = blockdate_long - (1000 * 300);
		blockdateafter_long = blockdate_long + (1000 * 500);
		
		blockdatebefore_st = sdf.format(new Date(blockdatebefore_long));
		blockdateafter_st = sdf.format(new Date(blockdateafter_long));
		
		List<SinkDTO> lists = new ArrayList<SinkDTO>();
		SinkDTO dto = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String queryStr = null;
		
		try {
			queryStr = "select * ";
			queryStr += "from " + findSink(sink_idx) + " ";
			queryStr += "where date between \'"+blockdatebefore_st+"\' and \'"+blockdateafter_st+"\'";

			conn = DriverManager.getConnection(jdbcDriver);
			
			pstmt = conn.prepareStatement(queryStr,ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);

			rs = pstmt.executeQuery();
			
			while (rs.next()) {
				dto = new SinkDTO();
				dto.setDate(rs.getString("date").substring(0,19));
				dto.setBps(rs.getString("bps"));
				dto.setPps(rs.getString("pps"));
				lists.add(dto);
			};
			
		} catch (SQLException ex) {
			ex.printStackTrace();
		} finally {
			if (rs != null) rs.close();
			if (pstmt != null) pstmt.close();
			if (conn != null) conn.close();
		}

		return lists;
	}

	/*
	 * Sink_idx와 실제 테이블 이름 Mapping
	 */
	private String findSink(int sink_idx){
		String SinkName = null;
		
		switch(sink_idx) {
			case 0	: SinkName="csinkhole";	break;			// 중앙
			case 1	: SinkName="gsinkhole"; break;			// 해외
			case 2	: SinkName="guro_sinkhole"; break;		// 구로
			case 3	: SinkName="yangjae_sinkhole"; break;	// 양재
			case 4	: SinkName="suwon_sinkhole"; break;		// 수원
			case 5	: SinkName="inchon_sinkhole"; break;	// 남인천
			case 6	: SinkName="pusan_sinkhole"; break;		// 부산
			case 7	: SinkName="wonju_sinkhole"; break;		// 원주
			case 8	: SinkName="deagu_sinkhole"; break;		// 대구
			case 9	: SinkName="jeju_sinkhole";	break;		// 제주
			case 10	: SinkName="chungju_sinkhole"; break;	// 청주
			case 11	: SinkName="deajun_sinkhole"; break;	// 대전
			case 12	: SinkName="gwangju_sinkhole"; break;	// 광주
			case 13	: SinkName="junju_sinkhole"; break;		// 전주
			case 14	: SinkName="moran_sinkhole"; break;		// 모란
			case 15	: SinkName="hehwa_sinkhole"; break;		// 혜화
			case 16 : SinkName="anyang_sinkhole"; break;	// 안양
			case 17	: SinkName="mokdong_sinkhole"; break;	// 목동
			case 18	: SinkName="ilsan_sinkhole"; break;		// 일산
		}
		
		return SinkName;
	}
}
