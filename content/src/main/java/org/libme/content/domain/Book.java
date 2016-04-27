package org.libme.content.domain;

import java.util.List;

/**
 * Created by Braidner
 */
public class Book extends BaseContent {

    public final static ContentType TYPE = ContentType.BOOK;

    private List<String> authors;

    @Override
    public ContentType getType() {
        return TYPE;
    }

    public List<String> getAuthors() {
        return authors;
    }

    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }
}
