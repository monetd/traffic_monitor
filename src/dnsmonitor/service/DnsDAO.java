package dnsmonitor.service;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

public class DnsDAO {
	
	private Connection conn = null;
	private String jdbcDriver = "jdbc:apache:commons:dbcp:dnsdbcp";
	
	/*
	 * DNS 트래픽을 DB로부터 수집 (Total 20)
	 */
	public List<DnsDTO> getDnsData(int ips_idx) throws SQLException {
		List<DnsDTO> lists = new ArrayList<DnsDTO>();
		DnsDTO dto = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
	
		String queryStr = makeQueryString(ips_idx);
		
		try {
			conn = DriverManager.getConnection(jdbcDriver);

			pstmt = conn.prepareStatement(queryStr,ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
			rs = pstmt.executeQuery();
			
			while (rs.next()) {
				dto = new DnsDTO();
				dto.setDate(rs.getString("date").substring(0,19));
				dto.setSnx0_pps_in(rs.getString("snx0_pps_in"));
				dto.setSnx1_pps_in(rs.getString("snx1_pps_in"));
				dto.setSnx2_pps_in(rs.getString("snx2_pps_in"));
				dto.setSnx3_pps_in(rs.getString("snx3_pps_in"));
				
				dto.setSnx0_pps_drop(rs.getString("snx0_drop_pps"));
				dto.setSnx1_pps_drop(rs.getString("snx1_drop_pps"));
				dto.setSnx2_pps_drop(rs.getString("snx2_drop_pps"));
				dto.setSnx3_pps_drop(rs.getString("snx3_drop_pps"));
				
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
	 * DNS 트래픽을 DB로부터 검색 (Total 20)
	 */
	public List<DnsDTO> searchDnsData(int ips_idx, String time) throws SQLException {
		List<DnsDTO> lists = new ArrayList<DnsDTO>();
		DnsDTO dto = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String queryStr = makeSearchQueryString(ips_idx, time);
		
		try {
			conn = DriverManager.getConnection(jdbcDriver);
			
			pstmt = conn.prepareStatement(queryStr,ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
			rs = pstmt.executeQuery();
			
			while (rs.next()) {
				dto = new DnsDTO();
				dto.setDate(rs.getString("date").substring(0,19));
				dto.setSnx0_pps_in(rs.getString("snx0_pps_in"));
				dto.setSnx1_pps_in(rs.getString("snx1_pps_in"));
				dto.setSnx2_pps_in(rs.getString("snx2_pps_in"));
				dto.setSnx3_pps_in(rs.getString("snx3_pps_in"));
				
				dto.setSnx0_pps_drop(rs.getString("snx0_drop_pps"));
				dto.setSnx1_pps_drop(rs.getString("snx1_drop_pps"));
				dto.setSnx2_pps_drop(rs.getString("snx2_drop_pps"));
				dto.setSnx3_pps_drop(rs.getString("snx3_drop_pps"));
				
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
	 * 각 IPS(Single, Dual)에 맞는 쿼리문 생성
	 */
	private String makeQueryString(int ips_idx) {
		String qryString = "SELECT top 20 * FROM (select top 20 * from $tableName order by date desc) AS total ORDER BY total.date";
		
		String qryString2 = "SELECT top 20 date, sum(snx0_pps_in) as snx0_pps_in, sum(snx0_bps_in) as snx0_bps_in, sum(snx1_pps_in) as snx1_pps_in, sum(snx1_bps_in) as snx1_bps_in, sum(snx2_pps_in) as snx2_pps_in, sum(snx2_bps_in) as snx2_bps_in, sum(snx3_pps_in) as snx3_pps_in, sum(snx3_bps_in) as snx3_bps_in, sum(snx0_drop_pps) as snx0_drop_pps, sum(snx1_drop_pps) as snx1_drop_pps, sum(snx2_drop_pps) as snx2_drop_pps, sum(snx3_drop_pps) as snx3_drop_pps " +
			"FROM (SELECT top 20 * FROM $tableName1 ORDER BY date desc UNION SELECT top 20 * FROM $tableName2 ORDER BY date desc) as total GROUP BY total.date";

		String rtnQuery = null;
		if (ips_idx == 0) {// 총합
			rtnQuery = qryString.replace("$tableName","total");
		} else if (ips_idx == 1) {// 중앙 2대
			qryString2 = qryString2.replace("$tableName1","central");
			rtnQuery = qryString2.replace("$tableName2","central2");
		} else if (ips_idx == 2) {// 프리미엄 2대
			qryString2 = qryString2.replace("$tableName1","premium");
			rtnQuery = qryString2.replace("$tableName2","premium2");
		} else if (ips_idx == 3) // KIX
			rtnQuery = qryString.replace("$tableName","kix");
		else if (ips_idx == 4) // 남인천
			rtnQuery = qryString.replace("$tableName","inchon");
		else if (ips_idx == 5) {// 수원 (2대)
			qryString2 = qryString2.replace("$tableName1","suwon");
			rtnQuery = qryString2.replace("$tableName2","suwon2");
		} else if (ips_idx == 6) // 광주
			rtnQuery = qryString.replace("$tableName","gwangju");
		else if (ips_idx == 7)	 // 대구
			rtnQuery = qryString.replace("$tableName","deagu");
		else if (ips_idx == 8)	 // 대전
			rtnQuery = qryString.replace("$tableName","deajun");
		else if (ips_idx == 9) // 청주
			rtnQuery = qryString.replace("$tableName","chungju");
		else if (ips_idx == 10) // 모란
			rtnQuery = qryString.replace("$tableName","moran");
		else if (ips_idx == 11) // 목동
			rtnQuery = qryString.replace("$tableName","mokdong");
		else if (ips_idx == 12) // 미아
			rtnQuery = qryString.replace("$tableName","mia");
		else if (ips_idx == 13) // 신제
			rtnQuery = qryString.replace("$tableName","jeaju");
		else if (ips_idx == 14) // 신촌
			rtnQuery = qryString.replace("$tableName","sinchon");
		else if (ips_idx == 15) // 원주
			rtnQuery = qryString.replace("$tableName","wonju");
		else if (ips_idx == 16) // 일산
			rtnQuery = qryString.replace("$tableName","ilsan");
		else if (ips_idx == 17) // 전주
			rtnQuery = qryString.replace("$tableName","junju");
		else if (ips_idx == 18) // 행당
			rtnQuery = qryString.replace("$tableName","hengdang");
		else if (ips_idx == 19) // 혜화
			rtnQuery = qryString.replace("$tableName","hehwa");
		else if (ips_idx == 20) // 영동
			rtnQuery = qryString.replace("$tableName","youngdong");
		else if (ips_idx == 21) // 구로
			rtnQuery = qryString.replace("$tableName","guro");
		else if(ips_idx == 22) // 부산
			rtnQuery = qryString.replace("$tableName","pusan");
		else if(ips_idx == 23) // 안양
			rtnQuery = qryString.replace("$tableName", "anyang");
		
		return rtnQuery;
	}
	
	/*
	 * 각 IPS(Single, Dual)에 맞는 검색 쿼리문 생성
	 */
	private String makeSearchQueryString(int ips_idx, String time) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		Date blockdate = null;
		long blockdate_long, blockdatebefore_long, blockdateafter_long;
		String blockdatebefore_st, blockdateafter_st;
		String rtnQuery = null;
		
		try {
			blockdate = sdf.parse(time);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		blockdate_long = blockdate.getTime();	// 받은 Param을 Long(밀리세컨드) 형식으로 변
		blockdatebefore_long = blockdate_long - (1000 * 300);	// 5분 빼줌
		blockdateafter_long = blockdate_long + (1000 * 300);	// 5분 더해줌
		
		// 문자로 변환
		blockdatebefore_st = sdf.format(new Date(blockdatebefore_long));
		blockdateafter_st = sdf.format(new Date(blockdateafter_long));
		
		String qryString = "select top 40 * from $tableName WHERE date between \'"+blockdatebefore_st+"\' and \'"+blockdateafter_st+"\'";
		String qryString2 = "SELECT top 40 date, sum(snx0_pps_in) as snx0_pps_in, sum(snx0_bps_in) as snx0_bps_in, sum(snx1_pps_in) as snx1_pps_in, sum(snx1_bps_in) as snx1_bps_in, sum(snx2_pps_in) as snx2_pps_in, sum(snx2_bps_in) as snx2_bps_in, sum(snx3_pps_in) as snx3_pps_in, sum(snx3_bps_in) as snx3_bps_in, sum(snx0_drop_pps) as snx0_drop_pps, sum(snx1_drop_pps) as snx1_drop_pps, sum(snx2_drop_pps) as snx2_drop_pps, sum(snx3_drop_pps) as snx3_drop_pps " +
			"FROM (SELECT top 40 * FROM $tableName1 WHERE date between \'"+blockdatebefore_st+"\' and \'"+blockdateafter_st+"\' UNION SELECT top 40 * FROM $tableName2 WHERE date between \'"+blockdatebefore_st+"\' and \'"+blockdateafter_st+"\') as total GROUP BY total.date";

		if (ips_idx == 0) {// 총합
			rtnQuery = qryString.replace("$tableName","total");
		} else if (ips_idx == 1) {// 중앙
			qryString2 = qryString2.replace("$tableName1","central");
			rtnQuery = qryString2.replace("$tableName2","central2");
		} else if (ips_idx == 2) {// 프리미
			qryString2 = qryString2.replace("$tableName1","premium");
			rtnQuery = qryString2.replace("$tableName2","premium2");
		} else if (ips_idx == 3) // KIX
			rtnQuery = qryString.replace("$tableName","kix");
		else if (ips_idx == 4) // 남인천
			rtnQuery = qryString.replace("$tableName","inchon");
		else if (ips_idx == 5) {// 수원
			qryString2 = qryString2.replace("$tableName1","suwon");
			rtnQuery = qryString2.replace("$tableName2","suwon2");
		} else if (ips_idx == 6) // 광주
			rtnQuery = qryString.replace("$tableName","gwangju");
		else if (ips_idx == 7)	 // 대구
			rtnQuery = qryString.replace("$tableName","deagu");
		else if (ips_idx == 8)	 // 대전
			rtnQuery = qryString.replace("$tableName","deajun");
		else if (ips_idx == 9) // 남청주
			rtnQuery = qryString.replace("$tableName","chungju");
		else if (ips_idx == 10) // 모란
			rtnQuery = qryString.replace("$tableName","moran");
		else if (ips_idx == 11) // 목동
			rtnQuery = qryString.replace("$tableName","mokdong");
		else if (ips_idx == 12) // 미아
			rtnQuery = qryString.replace("$tableName","mia");
		else if (ips_idx == 13) // 제주
			rtnQuery = qryString.replace("$tableName","jeaju");
		else if (ips_idx == 14) // 신촌
			rtnQuery = qryString.replace("$tableName","sinchon");
		else if (ips_idx == 15) // 원주
			rtnQuery = qryString.replace("$tableName","wonju");
		else if (ips_idx == 16) // 일산
			rtnQuery = qryString.replace("$tableName","ilsan");
		else if (ips_idx == 17) // 전주
			rtnQuery = qryString.replace("$tableName","junju");
		else if (ips_idx == 18) // 행당
			rtnQuery = qryString.replace("$tableName","hengdang");
		else if (ips_idx == 19) // 혜화
			rtnQuery = qryString.replace("$tableName","hehwa");
		else if (ips_idx == 20) // 영동
			rtnQuery = qryString.replace("$tableName","youngdong");
		else if (ips_idx == 21) // 구로
			rtnQuery = qryString.replace("$tableName","guro");
		else if(ips_idx == 22) // 부산
			rtnQuery = qryString.replace("$tableName","pusan");
		else if(ips_idx == 23)	// 안양
			rtnQuery = qryString.replace("$tableName", "anyang");
		
		return rtnQuery;
	}
}
