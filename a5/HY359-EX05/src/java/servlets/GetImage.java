package servlets;

import cs359db.db.PhotosDB;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Giakoumis Giwrgos
 */
public class GetImage extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {

        String photoId = request.getParameter("image");
        String wantMetadata = request.getParameter("metadata");

        try {
            if (wantMetadata.equals("true")) {
                // TODO implement give metadata functionality
            } else {
                byte[] blob = PhotosDB.getPhotoBlobWithID(Integer.parseInt(photoId));
                response.setContentType("image/jpg");
                try (ServletOutputStream out = response.getOutputStream()) {
                    out.write(blob);
                    out.flush();
                }
            }
        } catch (ClassNotFoundException ex) {
            System.out.println("servlets.GetImage.doPost(): " + ex.getMessage());
        }
    }
}
