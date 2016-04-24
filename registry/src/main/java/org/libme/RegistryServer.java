package org.libme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * Created by Braidner
 */
@SpringBootApplication
@EnableEurekaServer
public class RegistryServer {
    public static void main(String[] args) {
        SpringApplication.run(RegistryServer.class, args);
    }
}
