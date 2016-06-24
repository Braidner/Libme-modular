package org.libme.controller;

import com.turn.ttorrent.client.Client;
import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.libme.TorrentService;
import org.libme.client.TorrentClient;
import org.libme.model.service.TorrentCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;

/**
 * Created by Braidner
 */
@RestController
public class TorrentController {

    private static final Log log = LogFactory.getLog(TorrentService.class);

    @Autowired
    private TorrentClient torrentClient;

    @Autowired
    private TorrentCacheService torrentCacheService;

    @RequestMapping(path = "download", method = RequestMethod.POST)
    public String downloadTorrent(@RequestParam String contentId, @RequestParam String fileKey, @RequestParam String owner) throws IOException {
        log.info("Downloading torrent for: " + contentId + " owner: " + owner);
        InputStream torrentStream = torrentCacheService.download(fileKey);
        Client downloadClient = torrentClient.download(IOUtils.toByteArray(torrentStream));
        downloadClient.addObserver((observable, arg) -> {
            Client client = (Client) observable;
            float progress = client.getTorrent().getCompletion();
            if (client.getTorrent().isComplete()) {
                //TODO sent to convert
                log.info("Torrent downloaded");
            }
            log.info("Torrent progress: " + progress);
        });
        return "download started";
    }

    @RequestMapping("test")
    public String test() {
        System.out.println("asdasdasd");
        return "test";
    }

}
