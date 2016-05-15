package org.libme.content.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.libme.content.domain.Content;
import org.libme.content.domain.Film;
import org.libme.content.repository.ContentRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

/**
 * Created by Braidner
 */
public class ServerContentServiceTest {

    @InjectMocks
    private ServerContentService contentService;

    @Mock
    private ContentRepository contentRepository;

    private List<Content> contentList;

    @Before
    public void setUp() {
        contentList = new ArrayList<>();
        contentList.add(new Film());
        initMocks(this);
        when(contentRepository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(contentList));
    }

    @Test
    public void findResent() throws Exception {
        List<Content> resent = contentService.findResent();
        Assert.assertTrue("failed recent", resent.equals(contentList));
    }

}