package org.libme.content.domain;

/**
 * Created by Braidner
 */
public class Book extends BaseContent {

    public final static ContentType TYPE = ContentType.BOOK;

    @Override
    public ContentType getType() {
        return TYPE;
    }
}
