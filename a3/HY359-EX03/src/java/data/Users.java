/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package data;

import java.util.HashMap;

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
    
    public boolean userExist(String username){
        return (user_by_username.containsKey(username));
    }
    
    public boolean emailExist(String email){
        return (user_by_email.containsKey(email));
    }
    
    public boolean add(info user){
        return true;
    }
    
    public String print(info user){
        StringBuilder sb = new StringBuilder();
      
        return sb.toString();
    }
    
    
    
}
