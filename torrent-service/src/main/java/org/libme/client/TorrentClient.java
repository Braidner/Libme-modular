package org.libme.client;

import com.turn.ttorrent.client.Client;
import com.turn.ttorrent.client.SharedTorrent;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.libme.TorrentService;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.security.NoSuchAlgorithmException;


/**
 * Created by Braidner
 */
@Component
public class TorrentClient {

    private static final Log LOG = LogFactory.getLog(TorrentService.class);


//    @Value("${torrent:downloads:folder}")
    private Resource downloads;

    public Client download(byte[] torrentFile) {
        try {
            Client client = new Client(
                    InetAddress.getLocalHost(),
                    buildSharedTorrent(torrentFile));
            client.setMaxDownloadRate(50.0);
            client.setMaxUploadRate(50.0);
            client.download();
            return client;
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            throw new RuntimeException("torrent error", e); //TODO custom exception
        }
    }

    private SharedTorrent buildSharedTorrent(byte[] torrentFile) throws IOException, NoSuchAlgorithmException {
        return new SharedTorrent(torrentFile, new File("C:\\downloads"));// TODO: 6/13/2016 add dynamic folder
    }
}
