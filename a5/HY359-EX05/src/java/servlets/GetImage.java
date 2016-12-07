package servlets;

import cs359db.db.PhotosDB;
import cs359db.model.Photo;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Giakoumis Giwrgos
 */
@WebServlet(name = "GetImage", urlPatterns = {"/GetImage"})
public class GetImage extends HttpServlet {

    protected void processRequest(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {

        int photoId = Integer.parseInt(request.getParameter("image"));
        String wantMetadata = request.getParameter("metadata");

        try {
            if (wantMetadata != null && wantMetadata.equals("true")) {
                Photo photo = PhotosDB.getPhotoMetadataWithID(photoId);
                if (photo != null) {
                    try (PrintWriter out = response.getWriter()) {
                        out.append("{'username':").append(photo.getUserName());
                        out.append(",'title':").append(photo.getTitle());
                        out.append(",'date':").append(photo.getDate());
                        out.append(",'contentType':").append(photo.getContentType());
                        out.append(",'numberOfRatings':").append("" + photo.getNumberOfRatings());
                        out.append("}");
                    }
                } else {
                    response.setHeader("error", "image not in DB");
                }
            } else {
                byte[] blob = PhotosDB.getPhotoBlobWithID(photoId);
                if (blob != null) {
                    response.setContentType("image/jpeg");
                    try (ServletOutputStream out = response.getOutputStream()) {
                        out.write(blob);
                        out.flush();
                    }
                } else {
                    response.setHeader("error", "image not in DB");
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
