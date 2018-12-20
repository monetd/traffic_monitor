package auth.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class MemberDAO {

	private Connection conn = null;
	private String dbName = "security";
	private String dbUser = "logincheck";
	private String dbPass = "loginsec";
	
	/*
	 * 회원정보를 DB로부터수집
	 */
	public MemberDTO getMemberData(String id) throws SQLException {
		String driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
		
		MemberDTO member = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String queryStr = null;
		
		try {
			queryStr = "select * ";
			queryStr += "from member ";
			queryStr += "where id = ?";
			
			try {
				Class.forName(driver);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			conn = DriverManager.getConnection("jdbc:sqlserver://220.73.132.51:1433;DatabaseName="+dbName,dbUser,dbPass);
			
			pstmt = conn.prepareStatement(queryStr,ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
			pstmt.setString(1, id);
			rs = pstmt.executeQuery();
			
			if ( rs.next() ) {
				member = new MemberDTO();
				
				member.setId(rs.getString("id"));
				member.setName(rs.getString("name"));
				member.setPassword(rs.getString("password"));
			}

		} catch (SQLException ex) {
			ex.printStackTrace();
		} finally {
			if (rs != null) rs.close();
			if (pstmt != null) pstmt.close();
			if (conn != null) conn.close();
		}
		
		return member;
	}
}
