/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package data;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Tasos198
 */
public class Users {

    private HashMap<String, info> user_by_username;
    private HashMap<String, info> user_by_email;

    public Users() {
        this.user_by_username = new HashMap<>();
        this.user_by_email = new HashMap<>();
    }

    public boolean userExist(String username) {
        return (user_by_username.containsKey(username));
    }

    public boolean emailExist(String email) {
        return (user_by_email.containsKey(email));
    }

    public boolean add(info user) {
        return true;
    }
    
    public String printAllMembers(){
        StringBuilder sb = new StringBuilder();
        sb.append("<ol>"); 
        for(Map.Entry<String, info> entry : user_by_username.entrySet()){
            sb.append("<li>").append(entry.getKey()).append("</li>");
        }
        sb.append("</ol>");
        return sb.toString();
    }

    public String print(info user) {
        StringBuilder sb = new StringBuilder();
        sb.append("<H1> Your registration complete with the following data:</H1><br>");
        
        sb.append("<ul>");
        /*Username*/
        sb.append("<li>Username: ").append(user.getUsername()).append("</li>");
        
        /*Password*/
        sb.append("<li>");
        sb.append("<div class=\"container\">");
        sb.append("<button type=\"button\" class=\"btn btn-info\" data-toggle=\"collapse\" data-target=\"#pw\">Reveal Password</button>");
        sb.append("<div id=\"pw\" class=\"collapse\">");
        sb.append("<H5>").append(user.getPassword()).append("</H5>");
        sb.append("</div>");
        sb.append("</div>");
        sb.append("</li>");

        sb.append("<li>First Name: ").append(user.getFname()).append("</li>");

        sb.append("<li>Last Name: ").append(user.getLname()).append("</li>");

        sb.append("<li>Birthday Date: ").append(user.getBday()).append("</li>");

        if (user.getSex() != null) {
            sb.append("<li>Sex: ").append(user.getSex()).append("</li>");
        }

        sb.append("<li>Country: ").append(user.getCountry()).append("</li>");

        sb.append("<li>Town: ").append(user.getTown()).append("</li>");

        if (user.getExtraInfo() != null) {
            sb.append("<li>Extra info: ").append(user.getExtraInfo()).append("</li>");
        }
        
        sb.append("</ul>");
        return sb.toString();
    }

}
