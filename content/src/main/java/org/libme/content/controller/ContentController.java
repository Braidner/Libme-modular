package org.libme.content.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.xml.internal.messaging.saaj.util.ByteInputStream;
import org.libme.content.client.TorrentClient;
import org.libme.content.domain.Content;
import org.libme.content.service.ContentService;
import org.libme.model.service.TorrentCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by Braidner
 */
@RestController
@RequestMapping("resource")
public class ContentController {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final ExecutorService EXECUTOR_SERVICE = Executors.newFixedThreadPool(100);

    @Autowired
    private ContentService serverContentService;

    @Autowired
    private TorrentClient torrentClient;

    @Autowired
    private TorrentCacheService torrentCacheService;

    @RequestMapping(method = RequestMethod.POST)
    public String uploadContent(
            @RequestParam Map<String,String> params,
//            @RequestParam String contentJson,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        Content content = MAPPER.readValue(params.get("content"), Content.class);
        byte[] bytes = file.getBytes();
        EXECUTOR_SERVICE.submit(() -> {
            String fileKey = content.getId() + System.nanoTime();
            torrentCacheService.upload(fileKey, new ByteInputStream(bytes, bytes.length));
            torrentClient.downloadTorrent(content.getId(), fileKey);
        });
        return "";
    }
}
