package util;

import java.util.HashMap;
import java.util.Random;

/**
 *
 * @author Giakoumis Giwrgos
 */
public class Cookies {

    private static Random rand = new Random(); // Seeded by current date/time

    private static HashMap<Integer, String> servletCookies = new HashMap<>();

    // add cookie
    // remove cookie
    // count Cookies
    // check if user id logged in (if he has cookie)
    ////// private ///////
    // get cookie value
    // get cookie username
    public static int addCookie(String username) {
        int value = rand.nextInt();

        while (servletCookies.containsKey(value)) {
            value = rand.nextInt();
        }
        servletCookies.put(value, username);
        return value;
    }

    public static void removeCookie(String cookie) {
        if (cookie == null) {
            return;
        }

        int key = Integer.parseInt(cookie);
        servletCookies.remove(key);
    }

    public static String getCookieValue(String cookie) {
        if (cookie == null) {
            return null;
        }

        int key = Integer.parseInt(cookie);

        return servletCookies.get(key);
    }

}
