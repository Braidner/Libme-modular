package org.libme.service;

import org.codehaus.plexus.util.cli.Commandline;
import org.junit.Before;
import org.junit.Test;

/**
 * Created by Braidner
 */
public class HlsConvertServiceTest {

    private HlsConvertService convertService;

    @Before
    public void setUp() throws Exception {
        convertService = new HlsConvertService(); //todo move to mock
    }

    @Test
    public void convert() throws Exception {

    }

    @Test
    public void buildCommand() throws Exception {
        convertService.buildCommand("", "");
    }

    @Test
    public void executeCommandLine() throws Exception {
        convertService.executeCommandLine(new Commandline("ping ya.ru"));
    }

}