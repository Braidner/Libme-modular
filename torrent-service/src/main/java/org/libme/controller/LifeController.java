package org.libme.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Braidner
 */
@RestController
@RequestMapping("{id}")
public class LifeController {

    @RequestMapping(method = RequestMethod.GET)
    public String info(@PathVariable String id) {
        return "torrent info";
    }

    @RequestMapping(path = "stop")
    public String stop(@PathVariable String id) {
        return "torrent stopped";
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public String delete(@PathVariable String id) {
        return "torrent paused";
    }



}
