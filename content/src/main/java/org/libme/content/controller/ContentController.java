package org.libme.content.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.libme.content.client.TorrentClient;
import org.libme.content.domain.Content;
import org.libme.content.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * Created by Braidner
 */
@RestController
@RequestMapping("resource")
public class ContentController {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Autowired
    private ContentService serverContentService;

    @Autowired
    private TorrentClient torrentClient;

    @RequestMapping(method = RequestMethod.POST)
    public String uploadContent(
            @RequestParam Map<String,String> params,
//            @RequestParam String contentJson,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        String test = torrentClient.test();
        Content content = MAPPER.readValue(params.get("content"), Content.class);
        System.out.println(content);
        System.out.println(file.getOriginalFilename());
        torrentClient.downloadTorrent(file); //TODO  send meta info like name, save folder etc.
        return "";
    }
}
