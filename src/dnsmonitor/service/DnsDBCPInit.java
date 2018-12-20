package dnsmonitor.service;

import java.sql.DriverManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.commons.dbcp2.ConnectionFactory;
import org.apache.commons.dbcp2.DriverManagerConnectionFactory;
import org.apache.commons.dbcp2.PoolableConnection;
import org.apache.commons.dbcp2.PoolableConnectionFactory;
import org.apache.commons.dbcp2.PoolingDriver;
import org.apache.commons.pool2.impl.GenericObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;

/**
 * Servlet implementation class SinkDBCPInit
 */
public class DnsDBCPInit extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	public void init() throws ServletException {
		loadJDBCDriver();
		initConnectionPool();
	}
	
	private void loadJDBCDriver() {
		try {
			// 커넥션 풀에서 사용한 JDBC 드라이버 로
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		} catch (ClassNotFoundException ex) {
			throw new RuntimeException("fail to load JDBC Driver", ex);
		}
	}
	
	private void initConnectionPool() {
		try {
			String jdbcUrl = "jdbc:sqlserver://220.73.132.51:1433;DatabaseName=dnsips";
			String username = "dnsmonitor";
			String pw = "dnssec";
			
			// 커넥션 팩토리 생성, 커넥션 팩토리는 새로운 커넥션을 생성할 때 사용
			ConnectionFactory connFactory = new DriverManagerConnectionFactory(jdbcUrl,username,pw);
			
			// DBCP가 커넥션 풀에 커넥션을 보관할 때 사용하는 PoolableConnectionFactory 생성
			// 실제로 내부적으로 커넥션을 담고 있고 커넥션을 관리하는데 기능을 제공. 커넥션을 close 하면 종료하지 않고 커넥션 풀에 반환
			PoolableConnectionFactory poolableConnFactory = new PoolableConnectionFactory(connFactory, null);
			// 커넥션이 유효한지 확인할 때 사용하는 쿼리풀 설
			poolableConnFactory.setValidationQuery("select 1");
			
			GenericObjectPoolConfig poolConfig = new GenericObjectPoolConfig();
			poolConfig.setTimeBetweenEvictionRunsMillis(1000L*60L*1L);
			poolConfig.setTestWhileIdle(true);
			poolConfig.setMinIdle(100);
			poolConfig.setMaxTotal(300);
			
			GenericObjectPool<PoolableConnection> connectionPool = new GenericObjectPool<>(poolableConnFactory,poolConfig);
			
			poolableConnFactory.setPool(connectionPool);

			Class.forName("org.apache.commons.dbcp2.PoolingDriver");
			
			PoolingDriver driver = (PoolingDriver)DriverManager.getDriver("jdbc:apache:commons:dbcp:");
			driver.registerPool("dnsdbcp", connectionPool);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
       

}
