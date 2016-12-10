package servlets;

import cs359db.db.PhotosDB;
import cs359db.db.UserDB;
import cs359db.model.User;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
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
import util.Cookies;

/**
 *
 * @author Tasos Anastasas, Giakoumis Giwrgos
 */
@WebServlet(name = "UserServlet", urlPatterns = {"/UserServlet"})
public class UserServlet extends HttpServlet {

    Random rand = new Random(); // Seeded by current date/time

    private HashMap<Integer, String> servletCookies;

    @Override
    public void init() {
        this.servletCookies = new HashMap<>();
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
        if (missing(action)) {
            response.setHeader("fail", "Missing Parameters");
        } else {
//            deleteAllUsers();
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
                case "delete":
                    deleteAction(request, response);
                case "getNumOfShownImages":
                    shownImagesAction(request, response, "get");
                case "setNumOfShownImages":
                    shownImagesAction(request, response, "set");
                default:
                    response.setHeader("fail", "Wrong Parameters");
            }
        }
    }

    private void shownImagesAction(HttpServletRequest request, HttpServletResponse response, String action) {
        String username = Cookies.getCookieValue(Cookies.getRequestCookieValue(request, "tivUserServlet", null));

        if (username == null) {
            response.setHeader("fail", "Missing Cookie");
        } else { // have cookie
            if (action.equals("set")) {
                String num = request.getParameter("number");

                if (num != null) {
                    int numOfShownImages = Integer.parseInt(num);
                    int cookie = Integer.parseInt(Cookies.getRequestCookieValue(request, "tivUserServlet", null));
                    Cookies.setNumOfImages(cookie, numOfShownImages);
                } else {
                    response.setHeader("fail", "Missing Parameters");
                }
            } else { // get
                int cookie = Integer.parseInt(Cookies.getRequestCookieValue(request, "tivUserServlet", null));
                response.setHeader("number", "" + Cookies.getNumOfImages(cookie));
            }
        }
    }

    private void deleteAction(HttpServletRequest request, HttpServletResponse response)
            throws ClassNotFoundException, IOException {

        String username = Cookies.getCookieValue(Cookies.getRequestCookieValue(request, "tivUserServlet", null));

        if (username == null) { // cookie has expired
            response.setHeader("fail", "Missing Cookie");
        } else {
            List<Integer> allUserIds = PhotosDB.getPhotoIDs(2147483647, username);

            for (Integer id : allUserIds) {
                PhotosDB.deletePhoto(id);
            }

            UserDB.deleteUser(username);

            Cookie userCookie = Cookies.getRequestCookie(request, "tivUserServlet");

            userCookie.setValue(userCookie.getValue());
            userCookie.setMaxAge(0);
            response.addCookie(userCookie);

            Cookies.removeCookie(userCookie.getValue()); // from servlet cookies
        }
    }

    public void forwardToPage(final HttpServletRequest request,
            final HttpServletResponse response,
            String url)
            throws IOException, ServletException {

        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        dispatcher.forward(request, response);
    }

    private void deleteAllUsers() throws ClassNotFoundException {
        List<User> users = UserDB.getUsers();
        for (User user : users) {
            UserDB.deleteUser(user.getUserName());
        }
    }

    private void loginAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {

        String username = request.getParameter("username");//getting the username from request that client send
        String pw = request.getParameter("password");//password too

        if (username == null && pw == null) {
            // try to check if we have cookie for user
            username = Cookies.getCookieValue(Cookies.getRequestCookieValue(request, "tivUserServlet", null));//get username
            if (username == null) {//we don't have cookie we must return welcome page
                response.setHeader("error", "");//return error

                ServletContext context = getServletContext();
                context.setAttribute("data", UserDB.getUsers().size());
                context.setAttribute("data2", PhotosDB.getPhotoIDs(2147483647).size()); // with bigger int value
                forwardToPage(request, response, "/WEB-INF/JSP/guestUserHomePage.jsp");
            } else {
                response.setHeader("id", "Hello, " + username);
                forwardToPage(request, response, "/WEB-INF/JSP/loggedUserHomePage.jsp");
            }
        } else {
            //we found username from user login request
            if (!UserDB.checkValidUserName(username)) {
                User in;
                in = UserDB.getUser(username);//getting the info about user

                if (in.getPassword().compareTo(pw) != 0) {//if the password didn't matched
                    response.setHeader("error", "Username and password isn't matched!");//return error
                } else {
                    //Username match with password
                    response.setHeader("id", "Hello, " + username);
                    Cookie usrCookie = new Cookie("tivUserServlet", "" + Cookies.addCookie(username));//create and set cookies ,TODO rename addCookie
                    usrCookie.setMaxAge(3600);
                    response.addCookie(usrCookie);
                    //return the user main page
                    ServletContext context = getServletContext();
                    context.setAttribute("data", UserDB.getUser(username));
                    forwardToPage(request, response, "/WEB-INF/JSP/loggedUserHomePage.jsp");
                }
            } else {
                response.setHeader("error", "User not exist!");//return error
            }
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

        if (missing(username)
                || missing(password)
                || missing(email)
                || missing(fname)
                || missing(lname)
                || missing(birthday)
                || missing(sex)
                || missing(country)
                || missing(town)) {

            response.setHeader("fail", "Missing Parameters");
        } else {
            // TODO (maybe sync?) because a user might register after validation
            if (!UserDB.checkValidUserName(username)) {
                response.setHeader("error", "username:Username Already Exist");
            } else if (!UserDB.checkValidEmail(email)) {
                response.setHeader("error", "email:Email Already Exist");
            } else {
                if (extra == null) {
                    extra = "";
                }
                //creating new info for the user
                User new_user = new User(username, email, password, fname, lname, birthday, country, town, extra, sex);
                //add him on servlet "database"
                UserDB.addUser(new_user);

                response.setHeader("id", "Welcome, " + username);
                Cookie usrCookie = new Cookie("tivUserServlet", "" + Cookies.addCookie(username));//create and set cookies
                usrCookie.setMaxAge(3600);
                response.addCookie(usrCookie);

                ServletContext context = getServletContext();
                context.setAttribute("data", UserDB.getUser(username));
                context.setAttribute("header", "<h3 class=\"text-center success_msg\">Registration Completed.</h3>"
                        + "<h6 class=\"text-center\">Auto login in 5sec...</h6>");
                forwardToPage(request, response, "/WEB-INF/JSP/profilePage.jsp");
            }
        }
    }

    private void profileAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {

        String username = request.getParameter("username");

        if (username == null) {
            username = Cookies.getCookieValue(Cookies.getRequestCookieValue(request, "tivUserServlet", null));

            if (username == null) { // cookie has expired
                response.setHeader("fail", "Missing Cookie");
            } else {
                ServletContext context = getServletContext();
                context.setAttribute("data", UserDB.getUser(username));
                forwardToPage(request, response, "/WEB-INF/JSP/profilePage.jsp");
            }
        } else {
            ServletContext context = getServletContext();
            context.setAttribute("data", UserDB.getUser(username));
            context.setAttribute("withTiles", "true");
            forwardToPage(request, response, "/WEB-INF/JSP/profilePage.jsp");
        }
    }

    private void memberAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {

        Cookie userCookie = Cookies.getRequestCookie(request, "tivUserServlet");
        if (userCookie == null) { // cookie has expired
            response.setHeader("fail", "Missing Cookie");
        } else {
            ServletContext context = getServletContext();
            context.setAttribute("data", UserDB.getUsers());
            forwardToPage(request, response, "/WEB-INF/JSP/memberPage.jsp");
        }
    }

    private void checkAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {

        String username = request.getParameter("username"); // getting username
        String email = request.getParameter("email"); // and email

        if (!missing(username)) { // if client send username
            if (!missing(email)) { // send username and email
                response.setHeader("fail", "Too many Parameters");
            } else if (!UserDB.checkValidUserName(username)) {
                response.setHeader("error", "Username Already Exist");//send error message
            }
        } else {
            if (!missing(email)) { // same with email
                if (!UserDB.checkValidEmail(email)) {
                    response.setHeader("error", "Email Already Exist");
                }
            } else {
                response.setHeader("fail", "Missing Parameters");
            }
        }
    }

    private void profileSettingsAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {

        String username = Cookies.getCookieValue(Cookies.getRequestCookieValue(request, "tivUserServlet", null));
        if (username == null) { // cookie has expired
            response.setHeader("fail", "Missing Cookie");
        } else {
            User userData = UserDB.getUser(username);//and the info for that member

            ServletContext context = getServletContext();
            context.setAttribute("data", userData);
            response.setHeader("usrCOUNTRY_val", userData.getCountry());
            forwardToPage(request, response, "/WEB-INF/JSP/settingsPage.jsp");
        }
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

        if (missing(username)
                || missing(password)
                || missing(email)
                || missing(fname)
                || missing(lname)
                || missing(birthday)
                || missing(sex)
                || missing(country)
                || missing(town)) {

            response.setHeader("fail", "Missing Parameters");
        } else {
            String cookieVal = Cookies.getRequestCookieValue(request, "tivUserServlet", null);
            if (cookieVal == null) { // cookie has expired
                response.setHeader("fail", "Missing Cookie");
            } else {
                User newData = new User(username, email, password, fname, lname, birthday, country, town, extra, sex);
                UserDB.updateUser(newData);

                ServletContext context = getServletContext();
                context.setAttribute("data", newData);
                context.setAttribute("header", "<h3 class=\"text-center success_msg\">Profile changes applied</h3>");
                forwardToPage(request, response, "/WEB-INF/JSP/profilePage.jsp");
            }
        }
    }

    private void logoutAction(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException, ClassNotFoundException {

        Cookie userCookie = Cookies.getRequestCookie(request, "tivUserServlet");
        if (userCookie == null) { // cookie has expired
            response.setHeader("fail", "Missing Cookie");
        } else {
            userCookie.setValue(userCookie.getValue());
            userCookie.setMaxAge(0);
            response.addCookie(userCookie);

            Cookies.removeCookie(userCookie.getValue()); // from servlet cookies

            ServletContext context = getServletContext();
            context.setAttribute("data", UserDB.getUsers().size());
            context.setAttribute("data2", PhotosDB.getPhotoIDs(2147483647).size()); // with bigger int value
            forwardToPage(request, response, "/WEB-INF/JSP/guestUserHomePage.jsp");
        }
    }

    private boolean missing(String param) {
        return param == null || param.trim().isEmpty();
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
