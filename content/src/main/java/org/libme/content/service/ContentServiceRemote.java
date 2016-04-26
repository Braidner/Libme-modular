package org.libme.content.service;

import org.libme.content.domain.Content;
import org.libme.content.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Braidner
 */
@Service
public class ContentServiceRemote implements ContentService {

    @Autowired
    private ContentRepository contentRepository;

    public List<Content> findResent() {
        return contentRepository.findByName("%%");
    }

}
