package org.libme.content.domain;

import org.springframework.data.annotation.Id;

import java.io.Serializable;

/**
 * Created by Braidner
 */
abstract class BaseContent implements Content, Serializable {

    @Id
    private String id;

    private String name;

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}
