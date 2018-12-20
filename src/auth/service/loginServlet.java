package auth.service;

import java.io.*;
import java.sql.*;
import util.EncStringToSha;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class LoginServlet2
 */
// @WebServlet({ "/LoginServlet", "/Login.do" })
public class loginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public loginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=EUC-KR");
		request.setCharacterEncoding("EUC-KR");

		String id = request.getParameter("username").trim();
		String password = request.getParameter("password").trim();
		
		String name = null;

		if ( (name = checkLogin(id, password)) != null ) {
			HttpSession session = request.getSession();
			session.setAttribute("authID", name);
			request.getRequestDispatcher("/sinkhole").forward( request, response ); 
		} else {
			response.sendRedirect(request.getContextPath() + "/");
			return;
		}
	}
	
	private String checkLogin(String id, String password) throws ServletException {
		String name = null;
		String encPassword = EncStringToSha.SHA256(password);

		MemberDAO dao = new MemberDAO();
		try {
			MemberDTO member = dao.getMemberData(id);
			
			if ( member == null )
				return null;
			
			if ( !member.getPassword().equals(encPassword) ) {
				return null;
			} else {
				name = member.getName();
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return name;
	}

}
