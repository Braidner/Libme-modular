package org.libme.content.service;

import org.libme.content.client.ContentDiscoveryClient;
import org.libme.content.domain.Film;
import org.libme.content.domain.FilmDiscovery;
import org.libme.content.repository.DiscoveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Braidner
 */
@Service
public class ContentDiscoveryService {
    private static final String IMAGE_URL_TEMPLATE = "http://st.kp.yandex.net/images/film_big/%s.jpg";

    @Autowired
    private DiscoveryRepository discoveryRepository;

    @Autowired
    private ContentDiscoveryClient discoveryClient;

    public Film discovery(String id) {
        FilmDiscovery discoveredFilm = discoveryRepository.findByFilmID(id);
        if (discoveredFilm == null) {
            discoveredFilm = discoveryClient.getFilm(id);
            discoveryRepository.save(discoveredFilm);
        }
        Film film = new Film();
        film.setName(discoveredFilm.getNameRU());
        film.setKinopoiskId(id);
        film.setPosterUrl(String.format(IMAGE_URL_TEMPLATE, id));
        return film;
    }

}
