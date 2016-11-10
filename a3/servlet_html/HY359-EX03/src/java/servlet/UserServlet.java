/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import data.Users;
import data.info;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Tasos198
 */
@WebServlet(name = "UserServlet", urlPatterns = {"/UserServlet"})
public class UserServlet extends HttpServlet {

    private Users all_users;

    @Override
    public void init() {
        all_users = new Users();
    }

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        String action = request.getHeader("action");
        if (action.compareTo("login") == 0) {
            String username = request.getParameter("username");
            String pw = request.getParameter("password");

            if (!all_users.userExist(username)) {
                response.setHeader("error", "User not exist!");
                return;
            }
            info in = all_users.getUserInfo(username);
            if (in.getPassword().compareTo(pw) != 0) {
                response.setHeader("error", "Wrong password try again!");
                return;
            }
            try (PrintWriter out = response.getWriter()) {
                out.println(username);
            }
        } else if (action.compareTo("register") == 0) {
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            String email = request.getParameter("email");
            String fname = request.getParameter("fname");
            String lname = request.getParameter("lname");
            String birthday = request.getParameter("birthday");
            String sex = request.getParameter("sex");
            String country = request.getParameter("country");
            String town = request.getParameter("town");
            String extra = request.getParameter("extra");

            info new_user = new info(username, password, email, fname, lname, birthday, sex, country, town, extra);

            all_users.add(new_user);
            try (PrintWriter out = response.getWriter()) {
                out.println(all_users.print(new_user));
            }

        } else if (action.compareTo("check") == 0) {
            String username = request.getParameter("username");
            String email = request.getParameter("email");
            if (username!=null && all_users.userExist(username)) {
                response.setHeader("error", "Username Already Exist");
            } else {
                if (email!=null && all_users.emailExist(email)) {
                    response.setHeader("error", "Email Already Exist");
                }
            }
        } else if (action.compareTo("members") == 0) {
            try (PrintWriter out = response.getWriter()) {
                out.println(all_users.printAllMembers());
            }
        } else if (action.compareTo("userInfo") == 0){
            String username;
            info userData;
            username = request.getParameter("username");
            userData = all_users.getUserInfo(username);
            response.setHeader("username", userData.getUsername());
            response.setHeader("password", userData.getPassword());
            response.setHeader("email", userData.getEmail());
            response.setHeader("fname", userData.getFname());
            response.setHeader("lname", userData.getLname());
            response.setHeader("birthday", userData.getBday());
            response.setHeader("sex", userData.getSex());
            response.setHeader("town", userData.getTown());
            response.setHeader("country", userData.getCountry());
            response.setHeader("extra", userData.getExtraInfo());
        } 
        else{
            assert (true);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
