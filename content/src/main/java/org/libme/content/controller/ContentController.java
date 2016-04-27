package org.libme.content.controller;

import org.libme.content.domain.Content;
import org.libme.content.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Braidner
 */
@RestController
@RequestMapping("/content")
public class ContentController {

    @Autowired
    private ContentService serverContentService;

    @RequestMapping(name = "/recent", method = RequestMethod.GET)
    public List<Content> resent() {
        return serverContentService.findResent();
    }
}
