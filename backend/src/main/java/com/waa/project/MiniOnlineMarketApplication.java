package com.waa.project;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@SpringBootApplication
public class MiniOnlineMarketApplication {

    public static void main(String[] args) {
        SpringApplication.run(MiniOnlineMarketApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

   // @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//        mailSender.se("smtp.gmail.com");
//        mailSender.setPort(587);
//
////        mailSender.setUsername("minimarket0071@gmail.com");
////        mailSender.setPassword("Pokhara1x");
//
//        mailSender.setUsername("localhost.nepal@gmail.com");
//        mailSender.setPassword("123qwe!@#QWE");
//
//
//        Properties props = mailSender.getJavaMailProperties();
//        props.put("mail.transport.protocol", "smtp");
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.debug", "true");
//        props.put("mail.properties.test-connection", false);
        return mailSender;
    }
}
