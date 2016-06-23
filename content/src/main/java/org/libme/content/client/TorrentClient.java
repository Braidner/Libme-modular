package org.libme.content.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by Braidner
 */
@FeignClient(serviceId = "torrent-service")
public interface TorrentClient {

    /**
     * Downloading torrent with torrent client
     *
     * @return return torrent id
     */
    @RequestMapping(method = RequestMethod.POST, path = "/torrent/download")
    String downloadTorrent(@RequestParam("contentId") String contentId, @RequestParam("fileKey") String fileKey);

    @RequestMapping(method = RequestMethod.POST, path = "/torrent/test")
    String test();
}
