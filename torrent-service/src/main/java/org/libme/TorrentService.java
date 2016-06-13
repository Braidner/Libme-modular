package org.libme;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by Braidner
 */
@SpringBootApplication
public class TorrentService {

    private static final Log logger = LogFactory.getLog(TorrentService.class);

    public static void main(String[] args) {
        SpringApplication.run(TorrentService.class, args);
    }
}
