package sinkhole.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class getSinkServlet
 */
// @WebServlet({ "/sinkhole/getSinkData.do" })
public class getSinkServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getSinkServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		// doPost(request, response);
		response.setHeader("Content-Type", "application/json");
		response.setContentType("application/json; charset=euc-kr");
		response.setCharacterEncoding("euc-kr"); 
		
		List<SinkDTO> lists = new ArrayList<SinkDTO>();
		JSONObject rtnObj = new JSONObject();
		JSONArray arr = new JSONArray();

		int sink_idx = Integer.parseInt(request.getParameter("sink_idx"));
		SinkDAO dao = new SinkDAO();
		
		try {
			lists = dao.getSinkData(sink_idx);
			
			for(int i=0; i<lists.size(); i++) {
				JSONObject data = new JSONObject();
				data.put("date", lists.get(i).getDate());
				data.put("bps", lists.get(i).getBps());
				data.put("pps", lists.get(i).getPps());
				arr.add(data);
			}
			
			rtnObj.put("data",arr);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		response.getWriter().write(rtnObj.toString());
	}
}
