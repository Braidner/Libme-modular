package org.libme.content.client;

import org.libme.content.domain.FilmDiscovery;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by Braidner
 */
@FeignClient(url = "http://api.kinopoisk.cf/", name = "KinopoiskClient")
@FunctionalInterface
public interface ContentDiscoveryClient {

    @RequestMapping(method = RequestMethod.GET, path = "/getFilm?filmID={id}")
    FilmDiscovery getFilm(@RequestParam("id") String id);
}
