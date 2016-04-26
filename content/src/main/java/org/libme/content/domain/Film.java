package org.libme.content.domain;

/**
 * Created by Braidner
 */
public class Film extends BaseContent {

    public static final ContentType TYPE = ContentType.FILM;

    @Override
    public ContentType getType() {
        return TYPE;
    }
}
