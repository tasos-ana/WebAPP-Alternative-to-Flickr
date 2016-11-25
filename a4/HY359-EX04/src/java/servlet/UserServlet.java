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
import javax.servlet.http.Cookie;
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

    /*
     *Takes the request,and what cookie value we want.
    *if not found then we return the default value
     */
    private static String getCookieValue(HttpServletRequest request,
            String cookieName,
            String defaultValue) {
        Cookie[] cookies = request.getCookies();//get all the cookies from request
        if (cookies != null) {
            for (Cookie cookie : cookies) {//for each cookie we check the name
                if (cookieName.equals(cookie.getName())) {//if it's equal with the recommended
                    return (cookie.getValue());//return the value
                }
            }
        }
        return (defaultValue);
    }

    /*
    Takes the request and what cookie we want to return
     */
    private static Cookie getCookie(HttpServletRequest request,
            String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookieName.equals(cookie.getName())) {
                    return cookie;
                }
            }
        }
        return null;
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

        String action = request.getHeader("action");//read from header tha value of the action header
        if (action.compareTo("login") == 0) {//if the action it's login
            String username = request.getParameter("username");//getting the username from request that client send
            String pw = request.getParameter("password");//password too
            boolean fromCookie = false;
            if (username.compareTo("cook") == 0) {//if the client didnt send username then check the cookies
                username = getCookieValue(request, "username", "null");//get username
                pw = getCookieValue(request, "password", "null");//and password

                if (username == null || pw == null) {
                    response.setHeader("error", "cookie");//returned
                    return;
                }
                if (username.compareTo("null") == 0 && pw.compareTo("null") == 0) {//if we dont have cookie
                    response.setHeader("error", "cookie");//returned
                    return;
                }
                fromCookie = true;
            }
            if (!all_users.userExist(username)) {//checking if the user exist
                if (fromCookie) {//we need that case because servlet can change and all user erased but cookies exist 
                    getCookie(request, "username").setMaxAge(0);
                    getCookie(request, "password").setMaxAge(0);
                    response.setHeader("error", "cookie");
                    return;
                }
                response.setHeader("error", "User not exist!");
                return;
            }
            info in = all_users.getUserInfo(username);//getting the info about user
            if (in.getPassword().compareTo(pw) != 0) {//if the password didnt matched
                response.setHeader("error", "Wrong password try again!");//return error
                return;
            }
            try (PrintWriter out = response.getWriter()) {//return the username
                out.println(username);
                Cookie usrIDCookie = new Cookie("username", username);//create and set cookies
                Cookie usrPWCookie = new Cookie("password", pw);
                response.addCookie(usrIDCookie);
                response.addCookie(usrPWCookie);
            }
        } else if (action.compareTo("register") == 0) {//if we have register action
            //get from post all the data
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

            //creating new info for the user
            info new_user = new info(username, password, email, fname, lname, birthday, sex, country, town, extra);
            //add him on servlet "database"
            all_users.add(new_user);
            try (PrintWriter out = response.getWriter()) {
                out.println(all_users.print(new_user));
            }

        } else if (action.compareTo("check") == 0) {//if we have check action
            String username = request.getParameter("username");//getting username
            String email = request.getParameter("email");//and email
            if (username != null && all_users.userExist(username)) {//if client send username the check if not exist
                response.setHeader("error", "Username Already Exist");//send error message
            } else {
                if (email != null && all_users.emailExist(email)) {//same with email
                    response.setHeader("error", "Email Already Exist");
                }
            }
        } else if (action.compareTo("members") == 0) {//if the action it's member then we return all the member username
            try (PrintWriter out = response.getWriter()) {
                out.println(all_users.printAllMembers());
            }
        } else if (action.compareTo("userInfo") == 0) {//if the action it's userinfo return all the info for specified username
            String username;
            info userData;
            username = getCookieValue(request, "username", "null");//get username
            if(username.compareTo("null")==0){
                return;
            }
            userData = all_users.getUserInfo(username);//and the info for that member
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
        } else if (action.compareTo("change") == 0) {//if we have change action then we change the old info with new for specified username
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

            info newData = new info(username, password, email, fname, lname, birthday, sex, country, town, extra);
            all_users.update(username, email, newData);

        } else {
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
