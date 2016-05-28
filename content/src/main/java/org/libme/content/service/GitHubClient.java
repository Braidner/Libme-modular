package org.libme.content.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * Created by Braidner
 */
@FeignClient(url = "https://api.github.com", name = "GitHub")
public interface GitHubClient {

    @RequestMapping(method = RequestMethod.GET, value = "/repos/{owner}/{repo}/contributors")
    List<Contributor> contributors(@RequestParam("owner") String owner, @RequestParam("repo") String repo);
}
