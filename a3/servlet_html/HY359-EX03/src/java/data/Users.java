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
        String username = user.getUsername();
        String email = user.getEmail();
        
        user_by_email.put(email, user);
        user_by_username.put(username, user);
        
        return true;
    }
    
    public void update(String username, String email, info newData){
        info entry1 = user_by_username.get(username);
        info entry2 = user_by_email.get(email);
        
        entry1.setPassword(newData.getPassword());
        entry1.setFname(newData.getFname());
        entry1.setLname(newData.getLname());
        entry1.setBday(newData.getBday());
        entry1.setSex(newData.getSex());
        entry1.setTown(newData.getTown());
        entry1.setExtraInfo(newData.getExtraInfo());
        
        entry2.setPassword(newData.getPassword());
        entry2.setFname(newData.getFname());
        entry2.setLname(newData.getLname());
        entry2.setBday(newData.getBday());
        entry2.setSex(newData.getSex());
        entry2.setTown(newData.getTown());
        entry2.setExtraInfo(newData.getExtraInfo());
    }
    
    public info getUserInfo(String username){
        return user_by_username.get(username);
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
        sb.append("<H2> Your registration complete with the following data:</H2><br>");
        
        sb.append("<ul>");
        /*Username*/
        sb.append("<li>Username: ").append(user.getUsername()).append("</li>");
        
        /*Password*/
        sb.append("<button type=\"button\" class=\"btn btn-info btn-xs\" data-toggle=\"collapse\" data-target=\"#pw\">Reveal Password</button>");
        sb.append("<div id=\"pw\" class=\"collapse\">").append(user.getPassword());
        sb.append("</div>");

        sb.append("<li>Email: ").append(user.getEmail()).append("</li>");
        
        sb.append("<li>First Name: ").append(user.getFname()).append("</li>");

        sb.append("<li>Last Name: ").append(user.getLname()).append("</li>");

        sb.append("<li>Birthday Date: ").append(user.getBday()).append("</li>");

        if (user.getSex().compareTo("") != 0) {
            sb.append("<li>Sex: ").append(user.getSex()).append("</li>");
        }

        sb.append("<li>Country: ").append(user.getCountry()).append("</li>");

        sb.append("<li>Town: ").append(user.getTown()).append("</li>");

        if (user.getExtraInfo().compareTo("") != 0) {
            sb.append("<li>Extra info: ").append(user.getExtraInfo()).append("</li>");
        }
        
        sb.append("</ul>");
        return sb.toString();
    }

}
