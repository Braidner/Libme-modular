package org.libme.content.domain;

import org.springframework.data.annotation.Id;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

/**
 * Created by Braidner
 */
abstract class BaseContent implements Content, Serializable {

    @Id
    private String id;

    @NotNull
    private String name;

    @Valid
    private List<User> seeders;

    @Override
    public String getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public List<User> getSeeders() {
        return seeders;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSeeders(List<User> seeders) {
        this.seeders = seeders;
    }
}
