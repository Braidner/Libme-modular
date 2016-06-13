package org.libme.controller;

import com.turn.ttorrent.client.Client;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.libme.TorrentService;
import org.libme.client.TorrentClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Created by Braidner
 */
@RestController
public class TorrentController {

    private static final Log log = LogFactory.getLog(TorrentService.class);

    @Autowired
    private TorrentClient torrentClient;

    @RequestMapping
    public String download(@RequestParam("file") MultipartFile file) throws IOException {
        Client downloadClient = torrentClient.download(file.getBytes());
        downloadClient.addObserver((observable, arg) -> {
            Client client = (Client) observable;
            float progress = client.getTorrent().getCompletion();
            if (client.getTorrent().isComplete()) {
                //TODO sent to convert
            }
            log.info("Torrent progress: " + progress);
        });
        return "download started";
    }

}
