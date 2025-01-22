package com.example.springboot_rest.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingAspect
{
    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingAspect.class);

    //return type, fully qualified class name, method name, args
    //return type,class-name.methodname(args)
    //..for arguments
    @Before("execution(* com.example.springboot_rest.service.JobService.*(..))")
    public void logMethodCall(JoinPoint joinPoint)
    {
        String methodName = joinPoint.getSignature().getName();
        LOGGER.info("Method called: {}", methodName);
    }
}
