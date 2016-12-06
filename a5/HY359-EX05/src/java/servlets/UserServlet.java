// TODO bale munima sta assert
// TODO change author in all files
// TODO refresh cookie age se kathe request
package servlets;

import cs359db.db.UserDB;
import cs359db.model.User;
import java.io.IOException;
import java.util.HashMap;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Tasos Anastasas, Giakoumis Giwrgos
 */
@WebServlet(name = "UserServlet", urlPatterns = {"/UserServlet"})
public class UserServlet extends HttpServlet {

    Random rand = new Random(); // Seeded by current date/time

    private HashMap<Integer, String> servletCookies;

    private int addCookie(String username) {
        int value = rand.nextInt();

        while (servletCookies.containsKey(value)) {
            value = rand.nextInt();
        }
        servletCookies.put(value, username);
        return value;
    }

    private void removeCookie(String cookie) {
        if (cookie == null) {
            return;
        }
        int key;
        key = Integer.parseInt(cookie);
        if (servletCookies.containsKey(key)) {
            servletCookies.remove(key);
        }
    }

    private String getCookieValue(String cookie) {
        if (cookie == null) {
            return null;
        }
        int key;
        key = Integer.parseInt(cookie);
        if (servletCookies.containsKey(key)) {
            return servletCookies.get(key);
        }
        return null;
    }

    @Override
    public void init() {
        this.servletCookies = new HashMap<>();
    }

    /**
     * Takes the request, and what cookie value we want. if not found then we
     * return the default value
     */
    private static String getRequestCookieValue(HttpServletRequest request,
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
        return defaultValue;
    }

    /*
    Takes the request and what cookie we want to return
     */
    private static Cookie getRequestCookie(HttpServletRequest request,
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

    public void forwardToPage(final HttpServletRequest request,
            final HttpServletResponse response,
            String url)
            throws IOException, ServletException {
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        dispatcher.forward(request, response);
    }

    private void loginAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {
        String username = request.getParameter("username");//getting the username from request that client send
        String pw = request.getParameter("password");//password too
        if (username == null && pw == null) {//try to check if we have cookie for user
            username = getCookieValue(getRequestCookieValue(request, "tivUserServlet", null));//get username
            if (username == null) {//we don't have cookie we must return welcome page
                response.setHeader("error", "");//return error
                ServletContext context = getServletContext();
                context.setAttribute("data", UserDB.getUsers());
                forwardToPage(request, response, "/WEB-INF/JSP/welcomePage.jsp");
                return;
            }
            response.setHeader("id", "Hello, " + username);
            ServletContext context = getServletContext();
            context.setAttribute("data", UserDB.getUser(username));
            forwardToPage(request, response, "/WEB-INF/JSP/mainProfilePage.jsp");
            return;
        }
        //we found username from user login request
        if (!UserDB.checkValidUserName(username)) {
            User in;
            in = UserDB.getUser(username);//getting the info about user
            if (in.getPassword().compareTo(pw) != 0) {//if the password didnt matched
                response.setHeader("error", "Username and password isn't matched!");//return error
                return;
            }
            //Username match with password
            response.setHeader("id", "Hello again, " + username);
            Cookie usrCookie = new Cookie("tivUserServlet", "" + addCookie(username));//create and set cookies ,TODO rename addCookie
            usrCookie.setMaxAge(3600);
            response.addCookie(usrCookie);
            //return the user main page
            ServletContext context = getServletContext();
            context.setAttribute("data", UserDB.getUser(username));
            forwardToPage(request, response, "/WEB-INF/JSP/mainProfilePage.jsp");
        } else {
            response.setHeader("error", "User not exist!");//return error
        }
    }

    private void registerAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {
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

        if (username == null || password == null || email == null || fname == null || lname == null
                || birthday == null || sex == null || country == null || town == null || extra == null) {
            assert (false);
            return;
        }

        // TODO validate username, email (maybe sync?)
        //creating new info for the user
        User new_user = new User(username, email, password, fname, lname, birthday, country, town, extra, sex);
        //add him on servlet "database"
        UserDB.addUser(new_user);

        response.setHeader("id", "Welcome, " + username);
        Cookie usrCookie = new Cookie("tivUserServlet", "" + addCookie(username));//create and set cookies
        usrCookie.setMaxAge(3600);
        response.addCookie(usrCookie);
        response.setHeader("servlet", "<h2 class=\"text-center\">Registration Completete.</h2>"
                + "<h6 class=\"text-center\">Auto redirect in 5sec...</h6>"); // TODO setAttribute sto context
        ServletContext context = getServletContext();
        context.setAttribute("data", UserDB.getUser(username));
        forwardToPage(request, response, "/WEB-INF/JSP/profilePage.jsp");
    }

    // TODO na parw tin periptwsh na exei ginei expire to cookie
    private void profileAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {
        String username;
        username = getCookieValue(getRequestCookieValue(request, "tivUserServlet", null));
        ServletContext context = getServletContext();
        context.setAttribute("data", UserDB.getUser(username));
        forwardToPage(request, response, "/WEB-INF/JSP/profilePage.jsp");
    }

    private void memberAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {
        ServletContext context = getServletContext();
        context.setAttribute("data", UserDB.getUsers());
        forwardToPage(request, response, "/WEB-INF/JSP/memberPage.jsp");
    }

    private void checkAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {
        String username = request.getParameter("username");//getting username
        String email = request.getParameter("email");//and email
        if (username != null && !UserDB.checkValidUserName(username)) {//if client send username the check if not exist
            response.setHeader("error", "Username Already Exist");//send error message
        } else {
            if (email != null && !UserDB.checkValidEmail(email)) {//same with email
                response.setHeader("error", "Email Already Exist");
            } else {
                assert (false);
            }
        }
    }

    // TODO na parw tin periptwsh na exei ginei expire to cookie
    private void profileSettingsAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {
        String username;
        User userData;
        username = getCookieValue(getRequestCookieValue(request, "tivUserServlet", null));
        userData = UserDB.getUser(username);//and the info for that member
        ServletContext context = getServletContext();
        context.setAttribute("data", userData);
        response.setHeader("usrCOUNTRY_val", userData.getCountry());
        forwardToPage(request, response, "/WEB-INF/JSP/settingsPage.jsp");
    }

    private void changeAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {
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

        User newData = new User(username, email, password, fname, lname, birthday, country, town, extra, sex);
        UserDB.updateUser(newData);
    }

    // TODO na parw tin periptwsh na exei ginei expire to cookie
    private void logoutAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {
        removeCookie(getRequestCookieValue(request, "tivUserServlet", null));
        Cookie nwCookie;
        nwCookie = getRequestCookie(request, "tivUserServlet");
        nwCookie.setMaxAge(0);
        response.addCookie(nwCookie);
        ServletContext context = getServletContext();
        context.setAttribute("data", UserDB.getUsers());
        forwardToPage(request, response, "/WEB-INF/JSP/welcomePage.jsp");
    }

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     * @throws java.lang.ClassNotFoundException
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException {
        response.setContentType("text/html;charset=UTF-8");

        String action = request.getHeader("action");//read from header the value of the action header
        switch (action) {
            case "login":
                loginAction(request, response);
                break;
            case "register":
                registerAction(request, response);
                break;
            case "profilePage":
                profileAction(request, response);
                break;
            case "memberPage":
                memberAction(request, response);
                break;
            case "check":
                checkAction(request, response);
                break;
            case "profileSettings":
                profileSettingsAction(request, response);
                break;
            case "change":
                changeAction(request, response);
                break;
            case "logout":
                logoutAction(request, response);
                break;
            default:
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
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
