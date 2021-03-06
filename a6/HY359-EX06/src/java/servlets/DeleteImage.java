package servlets;

import cs359db.db.PhotosDB;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import util.Cookies;

/**
 *
 * @author Giwrgos Giakoumis
 */
@WebServlet(name = "DeleteImage", urlPatterns = {"/DeleteImage"})
public class DeleteImage extends HttpServlet {

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

        Cookie userCookie = Cookies.getRequestCookie(request, "tivUserServlet");

        if (userCookie == null) { // cookie has expired
            response.setHeader("fail", "Missing Cookie");
        } else {
            String photoIds = request.getParameter("image");

            response.setContentType("text/html;charset=UTF-8");
            if (photoIds != null && !photoIds.trim().isEmpty()) {
                String[] ids = photoIds.split(","); // can take multiple ids to delete
                try {
                    synchronized (this) {
                        for (String id : ids) {
                            PhotosDB.deletePhoto(Integer.parseInt(id));
                        }
                    }
                } catch (ClassNotFoundException ex) {
                    System.out.println("servlets.GetImage.doPost(): " + ex.getMessage());
                } catch (NumberFormatException e) {
                    response.setHeader("error",
                            "'image' parameter must contain integers separated with ','");
                }
            } else {
                response.setHeader("fail", "Missing Parameters");
            }
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
