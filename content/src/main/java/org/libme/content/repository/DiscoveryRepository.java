package org.libme.content.repository;

import org.libme.content.domain.FilmDiscovery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Braidner
 */
@Repository
public interface DiscoveryRepository extends MongoRepository<FilmDiscovery, String> {
    FilmDiscovery findByFilmID(String filmId);
}
