package servlets;

import cs359db.db.PhotosDB;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Gle1deR
 */
public class GetImageCollection extends HttpServlet {

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

        response.setContentType("application/json");

        String user = request.getParameter("user");
        String number = request.getParameter("number");

        if (number == null) {
            number = "10";
        }

        try {
            List<Integer> ids;
            if (user == null) {
                ids = PhotosDB.getPhotoIDs(Integer.parseInt(number));
            } else {
                ids = PhotosDB.getPhotoIDs(Integer.parseInt(number), user);
            }

            try (PrintWriter out = response.getWriter()) {
                if (ids.isEmpty()) {
                    response.setHeader("error", "not image in DB");
                    out.print("<h3>You have no uploaded images yet!!</h3>");
                } else {
                    Iterator<Integer> i = ids.iterator();
                    
                    out.append("[" + i.next());
                    i.forEachRemaining(id -> out.append("," + id));
                    out.append("]");
                }
            }
        } catch (ClassNotFoundException ex) {
            System.out.println("servlets.GetImage.doPost(): " + ex.getMessage());
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
