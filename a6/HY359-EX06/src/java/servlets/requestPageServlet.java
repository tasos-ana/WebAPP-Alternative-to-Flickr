package servlets;

import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Tasos Anastasas, Giakoumis Giwrgos
 */
@WebServlet(name = "requestPage", urlPatterns = {"/requestPage"}) // TODO rename se RequestPage
public class requestPageServlet extends HttpServlet {

    private ArrayList<String> ownedPages;

    @Override
    public void init() {
        ownedPages = new ArrayList<>();

        ownedPages.add("login");
        ownedPages.add("register");
        ownedPages.add("upload");
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

        String page = request.getParameter("page");
        if (page == null || page.trim().isEmpty()) {
            response.setHeader("fail", "Missing Parameters");
        } else {
            if (havePage(page)) {
                StringBuilder url = new StringBuilder();
                url.append("/WEB-INF/JSP/").append(page).append("Page.jsp");
                forwardToPage(request, response, url.toString());
            } else {
                response.setHeader("fail", "Wrong Parameters");
            }
        }
    }

    private void forwardToPage(HttpServletRequest request,
            HttpServletResponse response,
            String url)
            throws IOException, ServletException {

        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        dispatcher.forward(request, response);
    }

    private boolean havePage(String page) {
        return ownedPages.contains(page);
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
        return "Can retrieve registerPage, loginPage, uploadPage";
    }// </editor-fold>

}
