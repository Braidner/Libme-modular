package org.libme.content.controller;

import org.libme.content.domain.Content;
import org.libme.content.service.ContentService;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Braidner
 */
@RestController
public class ContentController {

    public static final String CONTENT_QUEUE = "content_queue";

    @Autowired
    private ContentService serverContentService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Bean
    public Queue testQueue() {
        return new Queue(CONTENT_QUEUE);
    }

    @RequestMapping(path = "/recent", method = RequestMethod.GET)
    public List<Content> resent() {
        rabbitTemplate.convertAndSend(CONTENT_QUEUE, "Test message");
        return serverContentService.findResent();
    }
}
