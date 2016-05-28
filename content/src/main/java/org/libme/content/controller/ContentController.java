package org.libme.content.controller;

import org.libme.content.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Braidner
 */
@RestController
public class ContentController {

    public static final String CONTENT_QUEUE = "content_queue";

    @Autowired
    private ContentService serverContentService;

//    @Autowired
//    private RabbitTemplate rabbitTemplate;
//
//    @Bean
//    public Queue testQueue() {
//        return new Queue(CONTENT_QUEUE);
//    }
//
//    @RequestMapping(path = "/recent", method = RequestMethod.GET)
//    public List<Content> resent() {
//        rabbitTemplate.convertAndSend(CONTENT_QUEUE, "Test message");
//        return serverContentService.findResent();
//    }
}
