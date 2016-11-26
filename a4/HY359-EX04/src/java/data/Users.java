/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Tasos198
 */
public class Users {

    private HashMap<String, info> user_by_username;//keep all the user with key the username
    private HashMap<String, info> user_by_email;//keep all the user with key the  email

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
    
    public List getAllMembmers(){
        List<String> myList = new ArrayList<String>();
        for(Map.Entry<String, info> entry : user_by_username.entrySet()){
            myList.add(entry.getKey());
        }
        return myList;
    }
}
