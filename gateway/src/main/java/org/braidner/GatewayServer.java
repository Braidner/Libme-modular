package org.braidner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

/**
 * Created by Braidner
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableZuulProxy
public class GatewayServer {
    public static void main(String[] args) {
        SpringApplication.run(GatewayServer.class, args);
    }


}
