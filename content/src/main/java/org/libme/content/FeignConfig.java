package org.libme.content;

import com.google.common.collect.ImmutableList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
import org.springframework.boot.autoconfigure.web.HttpMessageConvertersAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

/**
 * Created by Braidner
 */
@Configuration
public class FeignConfig {
    @Autowired
    public FeignConfig(HttpMessageConvertersAutoConfiguration convertersConfiguration) {
        HttpMessageConverters messageConverters = convertersConfiguration.messageConverters();
        messageConverters.getConverters().stream().filter(converter -> converter instanceof MappingJackson2HttpMessageConverter).forEach(converter -> {
            MappingJackson2HttpMessageConverter jsonConverter = (MappingJackson2HttpMessageConverter) converter;
            jsonConverter.setSupportedMediaTypes(ImmutableList.of(MediaType.APPLICATION_JSON, new MediaType("application", "*+json"), new MediaType("text", "json")));
        });
    }
}
