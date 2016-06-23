package org.libme.content.service;

import org.libme.content.domain.Content;
import org.libme.content.domain.Film;
import org.libme.model.domain.User;
import org.libme.content.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Braidner
 */
@Service
public class ServerContentService implements ContentService {

    @Autowired
    private ContentRepository contentRepository;

    public List<Content> findResent() {
        Page<Content> recentPage = contentRepository.findAll(new PageRequest(1, 10));
        return recentPage.getContent();
    }

    @Override
    public List<Content> findAll() {
        return null;
    }

    @Override
    public Content save(Content content) {
        return null;
    }

    public void createContent(Content content) {
        if (content instanceof Film) {
            createFilm((Film) content);
        }
    }

    public void createFilm(Film film) {
        Film savedFilm = contentRepository.findByKinopoiskId(film.getKinopoiskId());
        savedFilm.getSeeders().add(new User());
    }

}
