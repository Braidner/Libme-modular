package org.libme.content.controller;

import org.libme.content.domain.Content;
import org.libme.content.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Braidner
 */
@RestController
public class ContentController {

    @Autowired
    private ContentService serverContentService;

    @RequestMapping(method = RequestMethod.POST)
    public String uploadContent(Content content, MultipartFile file) {

        return "";
    }
}
