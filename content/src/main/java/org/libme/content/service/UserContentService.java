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
public class UserContentService implements ContentService {

    @Autowired
    private ContentRepository contentRepository;

    //TODO Реализовать логику хранения контента пользователя, щас все хранится и ищется только по общему контенту
    @Override
    public List<Content> findResent() {
        return null;
    }

    @Override
    public Content save(Content content) {
        return contentRepository.save(content);
    }
}
