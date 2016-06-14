package org.libme.content.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.File;

/**
 * Created by Braidner
 */
@FeignClient(serviceId = "torrent-service")
public interface TorrentClient {

    /**
     * Downloading torrent with torrent client
     *
     * @param file torrent file
     * @return return torrent id
     */
    @RequestMapping(method = RequestMethod.POST, path = "/download")
    String downloadTorrent(File file);
}
