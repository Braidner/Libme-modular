package org.libme.content.repository;

import org.libme.content.domain.Content;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Braidner
 */
@Repository
public interface ContentRepository extends CrudRepository<Content, String> {

    List<Content> findByName(String name);
    List<Content> findByNameAndType(String name, Content.ContentType type);
}
