package org.libme.content.client;

import org.libme.model.config.FeignFormConfig;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Braidner
 */
@FeignClient(serviceId = "torrent-service", configuration = FeignFormConfig.class)
public interface TorrentClient {

    /**
     * Downloading torrent with torrent client
     *
     * @param file torrent file
     * @return return torrent id
     */
    @RequestMapping(method = RequestMethod.POST, path = "/torrent/download")
    String downloadTorrent(@RequestParam(name = "file") MultipartFile file);

    @RequestMapping(method = RequestMethod.POST, path = "/torrent/test")
    String test();
}
