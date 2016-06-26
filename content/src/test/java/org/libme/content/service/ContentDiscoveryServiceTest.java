package org.libme.content.service;

import org.junit.Before;
import org.junit.Test;
import org.libme.content.client.ContentDiscoveryClient;
import org.libme.content.domain.Film;
import org.libme.content.domain.FilmDiscovery;
import org.libme.content.repository.DiscoveryRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

/**
 * Created by Braidner
 */
public class ContentDiscoveryServiceTest {

    @Mock
    private ContentDiscoveryClient discoveryClient;

    @Mock
    private DiscoveryRepository discoveryRepository;

    @InjectMocks
    private ContentDiscoveryService discoveryService;

    private FilmDiscovery film;
    private String kinopoiskId = "814016";

    @Before
    public void setUp() throws Exception {
        initMocks(this);
        film = new FilmDiscovery();
        film.setNameRU("adsadasd");
        film.setFilmID(kinopoiskId);
    }

    @Test
    public void discoveryWithCache() throws Exception {
        when(discoveryRepository.findByFilmID(kinopoiskId)).thenReturn(film);
        Film discovery = discoveryService.discovery(kinopoiskId);
        assertEquals(film.getNameRU(), discovery.getName());
        assertEquals(film.getFilmID(), discovery.getKinopoiskId());
    }

    @Test
    public void discoveryWithoutCache() throws Exception {
        when(discoveryRepository.findByFilmID(kinopoiskId)).thenReturn(null);
        when(discoveryClient.getFilm(kinopoiskId)).thenReturn(film);
        Film discovery = discoveryService.discovery(kinopoiskId);
        assertEquals(film.getNameRU(), discovery.getName());
        assertEquals(film.getFilmID(), discovery.getKinopoiskId());
    }

}