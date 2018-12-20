package dnsmonitor.service;

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
 * Servlet implementation class getDnsServlet
 */
// @WebServlet("/getDnsServlet")
public class getDnsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getDnsServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setHeader("Content-Type", "application/json");
		response.setContentType("application/json; charset=euc-kr");
		response.setCharacterEncoding("euc-kr");
		
		List<DnsDTO> lists = new ArrayList<DnsDTO>();
		JSONObject rtnObj = new JSONObject();
		JSONArray arr = new JSONArray();
		
		int ips_idx = Integer.parseInt(request.getParameter("ips_idx"));
		DnsDAO dao = new DnsDAO();
		
		try {
			lists = dao.getDnsData(ips_idx);
			
			for(int i=0; i<lists.size(); i++) {
				JSONObject data = new JSONObject();
				data.put("date", lists.get(i).getDate());
				data.put("sumpps_in", Float.parseFloat(lists.get(i).getSnx0_pps_in()) + Float.parseFloat(lists.get(i).getSnx2_pps_in()));
				data.put("sumpps_out", Float.parseFloat(lists.get(i).getSnx1_pps_in()) + Float.parseFloat(lists.get(i).getSnx3_pps_in()));
				data.put("sumpps_in_drop", Float.parseFloat(lists.get(i).getSnx0_pps_drop()) + Float.parseFloat(lists.get(i).getSnx2_pps_drop()));
				data.put("sumpps_out_drop", Float.parseFloat(lists.get(i).getSnx1_pps_drop()) + Float.parseFloat(lists.get(i).getSnx3_pps_drop()));
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
