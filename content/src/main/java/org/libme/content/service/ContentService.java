package org.libme.content.service;

import org.libme.content.domain.Content;

import java.util.List;

/**
 * Created by Braidner
 */
public interface ContentService {

    List<Content> findResent();

    Content save(Content content);
}
