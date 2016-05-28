package org.libme.content;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.concurrent.TimeUnit;

/**
 * Created by Braidner
 */
@EnableFeignClients
@WebAppConfiguration
@EnableAutoConfiguration
public class TestConfiguration {

    @Bean
    public EmbeddedServletContainerFactory servletContainer() {
        TomcatEmbeddedServletContainerFactory factory = new TomcatEmbeddedServletContainerFactory();
        factory.setPort(9000);
        factory.setSessionTimeout(10, TimeUnit.MINUTES);
        //factory.addErrorPages(new ErrorPage(HttpStatus.404, "/notfound.html"));
        return factory;
    }

}
