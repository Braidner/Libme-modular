package org.libme.content.domain;

/**
 * Created by Braidner
 */
public class Film extends Content {

    private String kinopoiskId;
    private String year;

    public String getKinopoiskId() {
        return kinopoiskId;
    }

    public void setKinopoiskId(String kinopoiskId) {
        this.kinopoiskId = kinopoiskId;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
