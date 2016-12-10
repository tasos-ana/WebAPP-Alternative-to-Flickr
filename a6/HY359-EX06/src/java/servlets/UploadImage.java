package servlets;

import cs359db.db.PhotosDB;
import java.io.IOException;
import java.io.InputStream;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import util.Cookies;

/**
 *
 * @author Giakoumis Giwrgos
 */
@WebServlet(name = "UploadImage", urlPatterns = {"/UploadImage"})
@MultipartConfig(maxFileSize = 1011074) // upload file's size up to 1MB
public class UploadImage extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {

        Cookie userCookie = Cookies.getRequestCookie(request, "tivUserServlet");

        if (userCookie == null) { // cookie has expired
            response.setHeader("fail", "Missing Cookie");
        } else {
            String userName = request.getParameter("userName");
            String title = request.getParameter("title");
            String contentType = request.getParameter("contentType");

            if (userName == null || userName.trim().isEmpty() // TODO make function for missing params
                    || contentType == null || contentType.trim().isEmpty()) {

                response.setHeader("fail", "Missing Parameters");
            } else {
                InputStream inputStream = null; // input stream of the upload file

                // obtains the upload file part in this multipart request
                Part filePart = request.getPart("photo");
                if (filePart != null) {
                    // prints out some information for debugging
                    System.out.println(filePart.getName());
                    System.out.println(filePart.getSize());
                    System.out.println(filePart.getContentType());

                    // obtains input stream of the upload file
                    inputStream = filePart.getInputStream();
                }
                try {
                    int photoId;
                    // uploadPhoto returns the id of the photo
                    if (title == null) {
                        photoId = PhotosDB.uploadPhoto(inputStream, userName, contentType);
                    } else {
                        photoId = PhotosDB.uploadPhoto(inputStream, userName, contentType, title);
                    }
                    if (photoId == -1) {
                        response.setHeader("error", "image upload failed");
                    } else {
                        response.setHeader("id", "" + photoId);
                    }
                } catch (Exception ex) {
                    System.out.println("servlets.UploadImage.doPost(): " + ex.getMessage());
                }
            }
        }
    }
}
