package org.libme.content.controller;

import org.junit.Before;
import org.junit.Test;
import org.libme.content.domain.Film;
import org.libme.content.service.ContentDiscoveryService;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

/**
 * Created by Braidner
 */
public class DiscoveryControllerTest {

    @Mock
    private ContentDiscoveryService discoveryService;

    @InjectMocks
    private DiscoveryController controller;

    @Before
    public void setUp() throws Exception {
        initMocks(this);
    }

    @Test
    public void discoveryFilm() throws Exception {
        Film film = new Film();
        String kinopoiskId = "814016";
        when(discoveryService.discovery(kinopoiskId)).thenReturn(film);
        Film newFilm = controller.discoveryFilm(kinopoiskId);
        assertEquals(film, newFilm);
    }

}