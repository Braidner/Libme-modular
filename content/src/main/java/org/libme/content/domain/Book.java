package org.libme.content.domain;

import java.util.List;

/**
 * Created by Braidner
 */
public class Book extends Content {

    private List<String> authors;

    public List<String> getAuthors() {
        return authors;
    }

    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }
}
