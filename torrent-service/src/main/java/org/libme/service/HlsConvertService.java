package org.libme.service;

import org.codehaus.plexus.util.cli.CommandLineException;
import org.codehaus.plexus.util.cli.Commandline;
import org.codehaus.plexus.util.cli.StreamConsumer;
import org.codehaus.plexus.util.cli.StreamPumper;
import org.springframework.stereotype.Service;

import java.io.File;

/**
 * Created by Braidner
 */
@Service
public class HlsConvertService implements ConvertService {

    private static final String EXECUTE_COMMAND = "ffmpeg -i %s %s.m3u8";

    @Override
    public void convert(File file) {
        String command = buildCommand(file.getPath(), file.getName());
        Commandline commandline = new Commandline(command);
        executeCommandLine(commandline);
    }

    String buildCommand(String filePath, String endName) {
        return String.format(EXECUTE_COMMAND, filePath, endName);
    }

    void executeCommandLine(Commandline cli) {

        StreamConsumer streamConsumer = System.out::println;

        try {
            Process p = cli.execute();

            StreamPumper outPumper = new StreamPumper(p.getInputStream(), streamConsumer);
            StreamPumper errPumper = new StreamPumper(p.getErrorStream(), streamConsumer);

            outPumper.setPriority(Thread.MIN_PRIORITY + 1);
            errPumper.setPriority(Thread.MIN_PRIORITY + 1);

            outPumper.start();
            errPumper.start();
            p.waitFor();
        } catch (CommandLineException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
