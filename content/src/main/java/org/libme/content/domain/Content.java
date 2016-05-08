package org.libme.content.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

/**
 * Created by Braidner
 */
@Document(collection = "content")
public abstract class Content implements Serializable {
    @Id
    private String id;

    @NotNull
    private String name;

    private String posterUrl;

    public abstract ContentType getType();

    @Valid
    private List<User> seeders;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

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

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }


    public enum ContentType {
        FILM,
        MUSIC,
        BOOK
    }
}
