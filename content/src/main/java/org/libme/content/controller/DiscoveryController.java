package org.libme.content.controller;

import org.libme.content.domain.Film;
import org.libme.content.service.ContentDiscoveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Braidner
 */
@RestController
@RequestMapping("discovery")
public class DiscoveryController {

    @Autowired
    private ContentDiscoveryService discoveryService;

    @RequestMapping("{id}")
    public Film discoveryFilm(@PathVariable String id) {
        return discoveryService.discovery(id);
    }
}
