package org.braidner;

import org.apache.catalina.filters.RequestDumperFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;

import javax.servlet.Filter;

/**
 * Created by Braidner
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableZuulProxy
public class GatewayServer {
    @Bean
    public FilterRegistrationBean requestDumperFilter() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        Filter requestDumperFilter = new RequestDumperFilter();
        registration.setFilter(requestDumperFilter);
        registration.addUrlPatterns("/*");
        registration.setOrder(0);
        return registration;
    }

    public static void main(String[] args) {
        SpringApplication.run(GatewayServer.class, args);
    }
}
