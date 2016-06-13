package org.libme.content.domain;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * Created by Braidner
 */
public class User implements Serializable {

    @NotNull
    @Length(min = 3, max = 25)
    private String username;

    @NotNull
    @Length(min = 8, max = 40)
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
