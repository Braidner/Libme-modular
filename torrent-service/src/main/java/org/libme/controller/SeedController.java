package org.libme.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Braidner
 */
@RestController
@RequestMapping("seed/{id}")
public class SeedController {


    @RequestMapping(path = "start", method = RequestMethod.POST)
    public String startSeed(@PathVariable String id) {
        return "start seeding";
    }

    @RequestMapping(path = "stop",method = RequestMethod.POST)
    public String stopSeed(@PathVariable String id) {
        return "stop seeding";
    }
}
