package org.libme.content.domain;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created by Braidner
 */
@Document(collection = "content")
public interface Content {
    String getId();
    String getName();
    ContentType getType();
    List<User> getSeeders();


    enum ContentType {
        FILM,
        MUSIC,
        BOOK
    }
}
