package org.libme.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;

/**
 * Created by Braidner
 */
@Service
public class TorrentCacheService {

    private static final String TORRENT_CACHE_BUCKET = "libme-torrent-file-bucket";

    @Autowired
    private StorageService storageService;

    public boolean upload(String key, InputStream file) {
        return storageService.upload(TORRENT_CACHE_BUCKET, key, file);
    }

    public InputStream download(String key) {
        return storageService.download(TORRENT_CACHE_BUCKET, key);
    }
}
