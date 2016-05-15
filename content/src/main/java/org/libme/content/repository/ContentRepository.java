package org.libme.content.repository;

import org.libme.content.domain.Content;
import org.libme.content.domain.Film;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Braidner
 */
@Repository
public interface ContentRepository extends MongoRepository<Content, String> {

    List<Content> findByName(String name);
    List<Content> findByNameAndType(String name, Content.ContentType type);
    Film findByKinopoiskId(String kinopoiskId);
}
