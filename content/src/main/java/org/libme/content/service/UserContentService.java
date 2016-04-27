package org.libme.content.service;

import org.libme.content.domain.Content;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Braidner
 */
@Service
public class UserContentService implements ContentService {

    //TODO Реализовать логику хранения контента пользователя, щас все хранится и ищется только по общему контенту
    @Override
    public List<Content> findResent() {
        return null;
    }
}
