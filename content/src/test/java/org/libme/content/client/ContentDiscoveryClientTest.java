package org.libme.content.client;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.libme.content.FeignConfig;
import org.libme.content.domain.FilmDiscovery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.security.oauth2.client.test.OAuth2ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Created by Braidner
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {org.libme.content.TestConfiguration.class, FeignConfig.class})
@OAuth2ContextConfiguration()
public class ContentDiscoveryClientTest {

    @Autowired
    private ContentDiscoveryClient contentDiscoveryClient;

    @Test
    public void getFilm() throws Exception {
        FilmDiscovery film = contentDiscoveryClient.getFilm("814016");
        assertNotNull(film);
        assertEquals(film.getNameRU(), "Люди Икс: Апокалипсис");
    }

}