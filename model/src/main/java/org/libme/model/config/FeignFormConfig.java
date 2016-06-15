package org.libme.model.config;

import feign.codec.Encoder;
import org.libme.model.encoder.FeignSpringFormEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by KuznetsovNE on 15.06.2016.
 */
@Configuration
public class FeignFormConfig {

    @Bean
    public Encoder formEncoder() {
        return new FeignSpringFormEncoder();
    }
}
