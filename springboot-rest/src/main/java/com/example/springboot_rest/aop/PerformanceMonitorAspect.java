package com.example.springboot_rest.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
@Component
@Aspect
public class PerformanceMonitorAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(PerformanceMonitorAspect.class);

    @Around("execution(* com.example.springboot_rest.service.JobService.*(..))")
    public Object monitorTime(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object obj = proceedingJoinPoint.proceed();
        long end = System.currentTimeMillis();

        String methodName = proceedingJoinPoint.getSignature().getName();

        // Corrected LOGGER statement
        LOGGER.info("Execution time for the '{}' method: {} ms", methodName, (end - start));

        return obj;
    }
}

