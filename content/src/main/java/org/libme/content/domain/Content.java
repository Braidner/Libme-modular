package org.libme.content.domain;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by Braidner
 */
@Document(collection = "content")
public interface Content {
    String getId();
    String getName();
    ContentType getType();

    enum ContentType {
        FILM,
        MUSIC,
        BOOK
    }
}
