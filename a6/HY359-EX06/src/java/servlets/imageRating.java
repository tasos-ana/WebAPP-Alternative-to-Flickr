/*
 *     Document      :imageRating.java
 *     Project       :HY359-EX06
 *     Author        :Gle1deR
 *     Created on    :Dec 10, 2016
 */
package servlets;

import cs359db.db.RatingDB;
import cs359db.model.Rating;
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import util.Cookies;

/**
 *
 * @author Giakoumis Giwrgos
 */
@WebServlet(name = "imageRating", urlPatterns = {"/imageRating"})
public class imageRating extends HttpServlet {

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
        if (action == null) {
            response.setHeader("fail", "Missing Parameters");
        } else {
            switch (action) {
                case "newRating":
                    newRating(request, response);
                    break;
                case "getRating":
                    getRatingInfo(request, response);
                    break;
                default:
                    response.setHeader("fail", "Wrong Parameters");
            }
        }
    }

    private void newRating(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException {
        String photoId = request.getParameter("image");
        String rate = request.getParameter("rate");
        
        if (photoId != null) {
            String username = Cookies.getCookieValue(Cookies.getRequestCookieValue(request, "tivUserServlet", null));

            if (username == null) { // cookie has expired
                response.setHeader("fail", "Missing Cookie");
            } else {
                Rating newRating = new Rating();
                
                newRating.setPhotoID(Integer.parseInt(photoId));
                newRating.setRate(Integer.parseInt(rate));
                newRating.setUserName(username);
                
                RatingDB.addRating(newRating);
            }
        } else {
            response.setHeader("fail", "Missing Parameters");
        }
    }

    private void getRatingInfo(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException {
        String photoId = request.getParameter("image");
        if (photoId != null) {
            String username = Cookies.getCookieValue(Cookies.getRequestCookieValue(request, "tivUserServlet", null));

            if (username == null) { // cookie has expired
                response.setHeader("fail", "Missing Cookie");
            } else {
                int sum = 0;
                List<Rating> ratings = RatingDB.getRatings(Integer.parseInt(photoId));
                for(Rating rat : ratings){
                    sum += rat.getRate();
                }
                
                response.setHeader("MO", "" + sum/ratings.size());
                response.setHeader("numberOfRatings", "" + sum/ratings.size());
            }
        } else {
            response.setHeader("fail", "Missing Parameters");
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
