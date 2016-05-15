package org.libme.content.domain;

/**
 * Created by Braidner
 */
public class Film extends Content {

    public static final ContentType TYPE = ContentType.FILM;

    private String kinopoiskId;

    @Override
    public ContentType getType() {
        return TYPE;
    }

    public String getKinopoiskId() {
        return kinopoiskId;
    }

    public void setKinopoiskId(String kinopoiskId) {
        this.kinopoiskId = kinopoiskId;
    }
}
