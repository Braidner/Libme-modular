package org.braidner;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Braidner
 */
@Controller
public class StaticController {

    @RequestMapping(path = {"login", "upload"}, method = RequestMethod.GET)
    public String index() {
        return "forward:/index.html";
    }
}
