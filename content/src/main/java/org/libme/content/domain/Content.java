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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Content content = (Content) o;

        if (id != null ? !id.equals(content.id) : content.id != null) return false;
        return name != null ? name.equals(content.name) : content.name == null;

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    public enum ContentType {
        FILM,
        MUSIC,
        BOOK
    }
}
