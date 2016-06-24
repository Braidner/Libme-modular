package org.libme.content.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.libme.content.client.TorrentClient;
import org.libme.content.domain.Content;
import org.libme.content.service.ContentService;
import org.libme.model.service.TorrentCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
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
    @Qualifier("userContentService")
    private ContentService contentService;

    @Autowired
    private TorrentClient torrentClient;

    @Autowired
    private TorrentCacheService torrentCacheService;

    @RequestMapping(method = RequestMethod.POST)
    public String uploadContent(
            @RequestParam Map<String,String> params,
            @RequestParam(value = "file", required = false) MultipartFile file,
            OAuth2Authentication principal
    ) throws IOException {
        Content content = MAPPER.readValue(params.get("content"), Content.class);
        Content savedContent = contentService.save(content);
        if (file != null) {
            byte[] bytes = file.getBytes();
            EXECUTOR_SERVICE.submit(() -> {
                String fileKey = savedContent.getId() + System.nanoTime();
                torrentCacheService.upload(fileKey, new ByteArrayInputStream(bytes));
                torrentClient.downloadTorrent(savedContent.getId(), fileKey, principal.getName());
            });
        }
        return "";
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Content> find() {
        return contentService.findAll();
    }
}
