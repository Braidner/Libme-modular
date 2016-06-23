package org.libme.content.service;

import org.libme.content.domain.Content;

import java.util.List;

/**
 * Created by Braidner
 */
public interface ContentService {

    List<Content> findResent();

    List<Content> findAll();

    Content save(Content content);
}
